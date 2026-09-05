/* ===================================================================
   Cosmic Calendar — application
   =================================================================== */

(function () {
    'use strict';

    const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const CALENDAR_YEAR = 2001; // non-leap: the cosmic year has 365 days
    const YEAR_START = Date.UTC(CALENDAR_YEAR, 0, 1);
    const YEAR_END = Date.UTC(CALENDAR_YEAR + 1, 0, 1);

    const $ = (sel, root) => (root || document).querySelector(sel);
    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
    const SVG_NS = 'http://www.w3.org/2000/svg';

    const svgEl = (name, attrs) => {
        const node = document.createElementNS(SVG_NS, name);
        for (const key in attrs) {
            if (attrs[key] !== undefined && attrs[key] !== null) {
                node.setAttribute(key, attrs[key]);
            }
        }
        return node;
    };

    /* ---------------------------------------------------------------
       Animated starfield
       --------------------------------------------------------------- */

    class Starfield {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.stars = [];
            this.shooting = null;
            this.nextShot = 2500;
            this.scroll = 0;
            this.last = 0;
            this.resize = this.resize.bind(this);
            this.frame = this.frame.bind(this);

            this.resize();
            window.addEventListener('resize', this.resize, { passive: true });
            window.addEventListener('scroll', () => { this.scroll = window.scrollY || 0; }, { passive: true });

            if (REDUCED_MOTION) {
                this.draw(0);
            } else {
                requestAnimationFrame(this.frame);
            }
        }

        resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.w = window.innerWidth;
            this.h = window.innerHeight;
            this.canvas.width = Math.round(this.w * dpr);
            this.canvas.height = Math.round(this.h * dpr);
            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            this.seed();
            if (REDUCED_MOTION) this.draw(0);
        }

        seed() {
            const target = clamp(Math.round((this.w * this.h) / 5200), 90, 340);
            this.stars = [];
            for (let i = 0; i < target; i++) {
                const depth = Math.random();
                this.stars.push({
                    x: Math.random() * this.w,
                    y: Math.random() * this.h,
                    r: 0.4 + depth * 1.5,
                    depth: 0.08 + depth * 0.42,
                    base: 0.25 + depth * 0.55,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.6 + Math.random() * 1.6,
                    hue: Math.random() < 0.22
                        ? (Math.random() < 0.5 ? '199, 210, 254' : '244, 194, 231')
                        : '255, 255, 255'
                });
            }
        }

        spawnShot() {
            const fromLeft = Math.random() < 0.5;
            this.shooting = {
                x: fromLeft ? -60 : this.w + 60,
                y: Math.random() * this.h * 0.55,
                vx: (fromLeft ? 1 : -1) * (0.5 + Math.random() * 0.35) * this.w / 900,
                vy: (0.22 + Math.random() * 0.18) * this.w / 900,
                life: 0,
                max: 900 + Math.random() * 500
            };
        }

        draw(t) {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.w, this.h);

            for (const s of this.stars) {
                let y = (s.y - this.scroll * s.depth) % this.h;
                if (y < 0) y += this.h;
                const twinkle = REDUCED_MOTION
                    ? 1
                    : 0.65 + 0.35 * Math.sin(s.phase + (t / 1000) * s.speed);
                ctx.globalAlpha = clamp(s.base * twinkle, 0, 1);
                ctx.fillStyle = 'rgb(' + s.hue + ')';
                ctx.beginPath();
                ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
                ctx.fill();

                if (s.r > 1.5) {
                    ctx.globalAlpha = clamp(s.base * twinkle * 0.18, 0, 1);
                    ctx.beginPath();
                    ctx.arc(s.x, y, s.r * 3.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            const shot = this.shooting;
            if (shot) {
                const progress = shot.life / shot.max;
                const alpha = Math.sin(progress * Math.PI);
                const tailX = shot.x - shot.vx * 130;
                const tailY = shot.y - shot.vy * 130;
                const grad = ctx.createLinearGradient(shot.x, shot.y, tailX, tailY);
                grad.addColorStop(0, 'rgba(255, 255, 255, ' + (alpha * 0.9).toFixed(3) + ')');
                grad.addColorStop(1, 'rgba(167, 139, 250, 0)');
                ctx.globalAlpha = 1;
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.6;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(shot.x, shot.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
            }

            ctx.globalAlpha = 1;
        }

        frame(t) {
            const dt = this.last ? t - this.last : 16;
            this.last = t;

            if (this.shooting) {
                this.shooting.life += dt;
                this.shooting.x += this.shooting.vx * dt * 0.6;
                this.shooting.y += this.shooting.vy * dt * 0.6;
                if (this.shooting.life > this.shooting.max) this.shooting = null;
            } else {
                this.nextShot -= dt;
                if (this.nextShot <= 0) {
                    this.spawnShot();
                    this.nextShot = 6000 + Math.random() * 9000;
                }
            }

            this.draw(t);
            requestAnimationFrame(this.frame);
        }
    }

    /* ---------------------------------------------------------------
       Application
       --------------------------------------------------------------- */

    class CosmicCalendar {
        constructor() {
            this.lang = this.detectLang();
            this.view = 'timeline';
            this.month = 11;             // December — where most events live
            this.category = 'all';
            this.query = '';
            this.activeIndex = -1;
            this.lastFocused = null;

            this.events = COSMIC_EVENTS
                .slice()
                .sort((a, b) => this.stamp(a) - this.stamp(b))
                .map((event, index) => Object.assign({}, event, { order: index }));

            this.cacheDom();
            this.buildStaticParts();
            this.bindEvents();
            this.applyLanguage();
            this.render();
            this.initReveal();
            this.initScroll();
            this.initCounters();
        }

        detectLang() {
            const stored = (() => {
                try { return localStorage.getItem('cc-lang'); } catch (e) { return null; }
            })();
            if (stored && TRANSLATIONS[stored]) return stored;
            const nav = (navigator.language || 'uk').slice(0, 2).toLowerCase();
            return nav === 'uk' || nav === 'ru' ? 'uk' : (TRANSLATIONS[nav] ? nav : 'en');
        }

        get t() { return TRANSLATIONS[this.lang]; }

        cacheDom() {
            this.dom = {
                header: $('#header'),
                langSwitch: $('.lang-switch'),
                langThumb: $('.lang-thumb'),
                viewSwitch: $('.view-switch'),
                viewThumb: $('.view-switch-thumb'),
                search: $('#search'),
                searchClear: $('#search-clear'),
                chips: $('#chips'),
                results: $('#results'),
                timelineItems: $('#timeline-items'),
                timelineRailFill: $('#timeline-rail-fill'),
                timeline: $('#timeline'),
                list: $('#list'),
                wheel: $('#wheel'),
                legend: $('#legend'),
                calendarGrid: $('#calendar-grid'),
                calendarMonth: $('#calendar-month'),
                calendarEmpty: $('#calendar-empty'),
                monthDots: $('#month-dots'),
                emptyState: $('#empty-state'),
                keyMoments: $('#key-moments'),
                footerMonths: $('#footer-months'),
                footerFill: $('#footer-fill'),
                footerThumb: $('#footer-thumb'),
                readProgress: $('#read-progress-bar'),
                toTop: $('#to-top'),
                modal: $('#modal'),
                modalCard: $('.modal-card'),
                modalIconUse: $('#modal-icon-use'),
                modalBadge: $('#modal-badge'),
                modalTitle: $('#modal-title'),
                modalDate: $('#modal-date'),
                modalDesc: $('#modal-description'),
                modalCosmic: $('#modal-cosmic-time'),
                modalReal: $('#modal-real-time'),
                modalProgressValue: $('#modal-progress-value'),
                modalProgressFill: $('#modal-progress-fill'),
                modalPrev: $('#modal-prev'),
                modalNext: $('#modal-next'),
                modalClose: $('#modal-close')
            };
        }

        /* ----------------------------------------------------------- */
        /* time helpers                                                */
        /* ----------------------------------------------------------- */

        stamp(event) {
            return Date.UTC(
                CALENDAR_YEAR,
                event.month - 1,
                event.day,
                event.hour || 0,
                event.minute || 0,
                event.second || 0
            );
        }

        yearFraction(event) {
            return (this.stamp(event) - YEAR_START) / (YEAR_END - YEAR_START);
        }

        formatDate(event) {
            const t = this.t;
            const day = event.day;
            const time = (event.hour || event.minute || event.second)
                ? ', ' + [event.hour || 0, event.minute || 0, event.second || 0]
                    .map(n => String(n).padStart(2, '0')).join(':')
                : '';
            const base = this.lang === 'uk'
                ? day + ' ' + t.monthsGenitive[event.month - 1]
                : t.months[event.month - 1] + ' ' + day;
            return base + time;
        }

        formatNumber(value, decimals) {
            return new Intl.NumberFormat(this.t.locale, {
                minimumFractionDigits: 0,
                maximumFractionDigits: decimals
            }).format(value);
        }

        formatYearsAgo(years) {
            const uk = this.lang === 'uk';
            if (years === 0) return this.t.ui.present;

            if (years >= 1e9) {
                const v = this.formatNumber(years / 1e9, 2);
                return uk ? v + ' млрд років тому' : v + ' billion years ago';
            }
            if (years >= 1e6) {
                const v = this.formatNumber(years / 1e6, 1);
                return uk ? v + ' млн років тому' : v + ' million years ago';
            }
            if (years >= 1e3) {
                const v = this.formatNumber(Math.round(years / 1e3), 0);
                return uk ? v + ' тис. років тому' : v + ' thousand years ago';
            }
            return this.formatNumber(years, 0) + ' ' + this.t.ui.yearsAgo;
        }

        pluralEvents(n) {
            const ui = this.t.ui;
            if (this.lang !== 'uk') return n === 1 ? ui.resultsOne : ui.resultsMany;
            const mod10 = n % 10;
            const mod100 = n % 100;
            if (mod10 === 1 && mod100 !== 11) return ui.resultsOne;
            if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return ui.resultsFew;
            return ui.resultsMany;
        }

        color(category) { return CATEGORY_COLORS[category] || '#818cf8'; }
        iconId(category) { return '#' + (CATEGORY_ICONS[category] || 'i-universe'); }

        /* ----------------------------------------------------------- */
        /* static scaffolding                                          */
        /* ----------------------------------------------------------- */

        buildStaticParts() {
            // category filter chips
            const all = document.createElement('button');
            all.type = 'button';
            all.className = 'chip chip--all is-active';
            all.dataset.category = 'all';
            all.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-filter"/></svg><span></span>';
            this.dom.chips.appendChild(all);

            CATEGORY_ORDER.forEach(category => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'chip';
                chip.dataset.category = category;
                chip.style.setProperty('--cat', this.color(category));
                chip.innerHTML =
                    '<svg class="icon" aria-hidden="true"><use href="' + this.iconId(category) + '"/></svg>' +
                    '<span></span>';
                this.dom.chips.appendChild(chip);
            });

            // wheel legend
            CATEGORY_ORDER.forEach(category => {
                const li = document.createElement('li');
                li.dataset.category = category;
                li.style.setProperty('--cat', this.color(category));
                li.innerHTML = '<i aria-hidden="true"></i><span></span>';
                this.dom.legend.appendChild(li);
            });
        }

        bindEvents() {
            $$('.lang-btn').forEach(btn => {
                btn.addEventListener('click', () => this.setLanguage(btn.dataset.lang));
            });

            $$('.view-btn').forEach(btn => {
                btn.addEventListener('click', () => this.setView(btn.dataset.view));
            });

            this.dom.chips.addEventListener('click', e => {
                const chip = e.target.closest('.chip');
                if (!chip) return;
                this.category = chip.dataset.category;
                $$('.chip', this.dom.chips).forEach(c => c.classList.toggle('is-active', c === chip));
                this.render();
            });

            let searchTimer;
            this.dom.search.addEventListener('input', () => {
                clearTimeout(searchTimer);
                this.dom.searchClear.hidden = !this.dom.search.value;
                searchTimer = setTimeout(() => {
                    this.query = this.dom.search.value.trim().toLowerCase();
                    this.render();
                }, 160);
            });

            this.dom.searchClear.addEventListener('click', () => {
                this.dom.search.value = '';
                this.dom.searchClear.hidden = true;
                this.query = '';
                this.render();
                this.dom.search.focus();
            });

            $('#reset-filters').addEventListener('click', () => this.resetFilters());

            $('#prev-month').addEventListener('click', () => this.stepMonth(-1));
            $('#next-month').addEventListener('click', () => this.stepMonth(1));

            this.dom.monthDots.addEventListener('click', e => {
                const dot = e.target.closest('.month-dot');
                if (!dot) return;
                this.month = Number(dot.dataset.month);
                this.renderCalendar();
            });

            this.dom.modalClose.addEventListener('click', () => this.closeModal());
            $('.modal-backdrop').addEventListener('click', () => this.closeModal());
            this.dom.modalPrev.addEventListener('click', () => this.stepEvent(-1));
            this.dom.modalNext.addEventListener('click', () => this.stepEvent(1));

            document.addEventListener('keydown', e => {
                if (this.dom.modal.hidden) return;
                if (e.key === 'Escape') { this.closeModal(); return; }
                if (e.key === 'ArrowLeft') { this.stepEvent(-1); return; }
                if (e.key === 'ArrowRight') { this.stepEvent(1); return; }
                if (e.key === 'Tab') this.trapFocus(e);
            });

            this.dom.toTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
            });

            window.addEventListener('resize', () => {
                this.moveThumb(this.dom.viewSwitch, this.dom.viewThumb, '.view-btn.is-active');
                this.moveThumb(this.dom.langSwitch, this.dom.langThumb, '.lang-btn.is-active');
            }, { passive: true });
        }

        resetFilters() {
            this.category = 'all';
            this.query = '';
            this.dom.search.value = '';
            this.dom.searchClear.hidden = true;
            $$('.chip', this.dom.chips).forEach(c => c.classList.toggle('is-active', c.dataset.category === 'all'));
            this.render();
        }

        /* ----------------------------------------------------------- */
        /* language                                                    */
        /* ----------------------------------------------------------- */

        setLanguage(lang) {
            if (!TRANSLATIONS[lang] || lang === this.lang) return;
            this.lang = lang;
            try { localStorage.setItem('cc-lang', lang); } catch (e) { /* private mode */ }
            this.applyLanguage();
            this.render();
            if (this.activeIndex >= 0 && !this.dom.modal.hidden) this.fillModal();
        }

        translate(path) {
            return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), this.t);
        }

        applyLanguage() {
            document.documentElement.lang = this.lang;

            $$('[data-i18n]').forEach(node => {
                const value = this.translate(node.dataset.i18n);
                if (typeof value === 'string') node.textContent = value;
            });
            $$('[data-i18n-placeholder]').forEach(node => {
                const value = this.translate(node.dataset.i18nPlaceholder);
                if (typeof value === 'string') node.setAttribute('placeholder', value);
            });
            $$('[data-i18n-aria]').forEach(node => {
                const value = this.translate(node.dataset.i18nAria);
                if (typeof value === 'string') node.setAttribute('aria-label', value);
            });

            $$('.lang-btn').forEach(btn => {
                const active = btn.dataset.lang === this.lang;
                btn.classList.toggle('is-active', active);
                btn.setAttribute('aria-pressed', String(active));
            });

            // chips
            $$('.chip', this.dom.chips).forEach(chip => {
                const key = chip.dataset.category;
                $('span', chip).textContent = key === 'all'
                    ? this.t.ui.filterAll
                    : this.t.categories[key];
            });

            // legend
            $$('li', this.dom.legend).forEach(li => {
                $('span', li).textContent = this.t.categories[li.dataset.category];
            });

            // key moments
            this.dom.keyMoments.innerHTML = '';
            this.t.keyMoments.forEach(moment => {
                const li = document.createElement('li');
                li.innerHTML = '<b></b><span></span>';
                $('b', li).textContent = moment.date;
                $('span', li).textContent = moment.text;
                this.dom.keyMoments.appendChild(li);
            });

            // footer month ticks
            this.dom.footerMonths.innerHTML = '';
            this.t.monthsShort.forEach(name => {
                const span = document.createElement('span');
                span.textContent = name;
                this.dom.footerMonths.appendChild(span);
            });

            requestAnimationFrame(() => {
                this.moveThumb(this.dom.viewSwitch, this.dom.viewThumb, '.view-btn.is-active');
                this.moveThumb(this.dom.langSwitch, this.dom.langThumb, '.lang-btn.is-active');
            });
        }

        moveThumb(container, thumb, activeSelector) {
            if (!container || !thumb) return;
            const active = $(activeSelector, container);
            if (!active) return;
            thumb.style.setProperty('--x', active.offsetLeft + 'px');
            thumb.style.setProperty('--w', active.offsetWidth + 'px');
        }

        /* ----------------------------------------------------------- */
        /* rendering                                                   */
        /* ----------------------------------------------------------- */

        setView(view) {
            if (view === this.view) return;
            this.view = view;
            $$('.view-btn').forEach(btn => {
                const active = btn.dataset.view === view;
                btn.classList.toggle('is-active', active);
                btn.setAttribute('aria-selected', String(active));
            });
            $$('.view').forEach(v => v.classList.toggle('is-active', v.id === 'view-' + view));
            this.moveThumb(this.dom.viewSwitch, this.dom.viewThumb, '.view-btn.is-active');
            this.render();
        }

        get filtered() {
            const q = this.query;
            return this.events.filter(event => {
                if (this.category !== 'all' && event.category !== this.category) return false;
                if (!q) return true;
                const haystack = (
                    event.title.uk + ' ' + event.title.en + ' ' +
                    event.description.uk + ' ' + event.description.en + ' ' +
                    (this.t.categories[event.category] || '')
                ).toLowerCase();
                return haystack.includes(q);
            });
        }

        render() {
            const events = this.filtered;
            const isEmpty = events.length === 0;

            this.dom.results.textContent = events.length + ' ' + this.pluralEvents(events.length);

            const calendarView = this.view === 'calendar';
            this.dom.emptyState.hidden = !isEmpty || calendarView;
            $$('.view').forEach(v => {
                v.classList.toggle('is-active', v.id === 'view-' + this.view);
            });
            if (isEmpty && !calendarView) {
                $('#view-' + this.view).classList.remove('is-active');
            }

            if (this.view === 'timeline') this.renderTimeline(events);
            if (this.view === 'list') this.renderList(events);
            if (this.view === 'wheel') this.renderWheel(events);
            if (this.view === 'calendar') this.renderCalendar(events);

            this.updateScrollUi();
        }

        eventCard(event, options) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'event-card reveal';
            button.style.setProperty('--cat', this.color(event.category));
            button.style.setProperty('--delay', Math.min((options && options.index) || 0, 8) * 0.045 + 's');
            button.dataset.order = event.order;

            const parts = [];
            if (options && options.node) parts.push('<span class="event-node" aria-hidden="true"></span>');
            parts.push(
                '<span class="event-icon" aria-hidden="true">' +
                '<svg class="icon"><use href="' + this.iconId(event.category) + '"/></svg></span>',
                '<span class="event-body">',
                '<span class="event-date"></span>',
                '<span class="event-title"></span>',
                '<span class="event-desc"></span>',
                '<span class="event-ago"></span>',
                '</span>'
            );
            button.innerHTML = parts.join('');

            $('.event-date', button).textContent = this.formatDate(event);
            $('.event-title', button).textContent = event.title[this.lang];
            $('.event-desc', button).textContent = event.description[this.lang];
            $('.event-ago', button).textContent = this.formatYearsAgo(event.yearsAgo);

            const title = $('.event-title', button);
            title.className = 'event-title';

            button.addEventListener('click', () => this.openModal(event.order));
            return button;
        }

        renderTimeline(events) {
            const frag = document.createDocumentFragment();
            events.forEach((event, index) => {
                frag.appendChild(this.eventCard(event, { node: true, index: index }));
            });
            this.dom.timelineItems.replaceChildren(frag);
            this.observeReveal(this.dom.timelineItems);
        }

        renderList(events) {
            const frag = document.createDocumentFragment();
            events.forEach((event, index) => {
                frag.appendChild(this.eventCard(event, { index: index }));
            });
            this.dom.list.replaceChildren(frag);
            this.observeReveal(this.dom.list);
        }

        /* ---- wheel ------------------------------------------------- */

        ringOf(event) {
            const lastDay = event.month === 12 && event.day === 31;
            if (!lastDay) return 0;
            if ((event.hour || 0) === 23 && (event.minute || 0) === 59) return 2;
            return 1;
        }

        ringFraction(event, ring) {
            if (ring === 0) return this.yearFraction(event);
            const h = event.hour || 0;
            const m = event.minute || 0;
            const s = event.second || 0;
            if (ring === 1) return (h * 3600 + m * 60 + s) / 86400;
            return s / 60;
        }

        renderWheel(events) {
            const size = 520;
            const c = size / 2;
            const radii = [212, 150, 92];
            const wrap = this.dom.wheel;
            wrap.innerHTML = '';

            const svg = svgEl('svg', {
                viewBox: '0 0 ' + size + ' ' + size,
                role: 'img',
                'aria-label': this.t.ui.wheelHint
            });

            const defs = svgEl('defs');
            const grad = svgEl('radialGradient', { id: 'wheelCore' });
            grad.appendChild(svgEl('stop', { offset: '0%', 'stop-color': '#ffffff' }));
            grad.appendChild(svgEl('stop', { offset: '35%', 'stop-color': '#f9a8d4', 'stop-opacity': '.8' }));
            grad.appendChild(svgEl('stop', { offset: '100%', 'stop-color': '#6366f1', 'stop-opacity': '0' }));
            defs.appendChild(grad);

            const sweep = svgEl('linearGradient', { id: 'wheelSweep', x1: '0', y1: '0', x2: '1', y2: '0' });
            sweep.appendChild(svgEl('stop', { offset: '0%', 'stop-color': '#a78bfa', 'stop-opacity': '0' }));
            sweep.appendChild(svgEl('stop', { offset: '100%', 'stop-color': '#a78bfa', 'stop-opacity': '.55' }));
            defs.appendChild(sweep);
            svg.appendChild(defs);

            const point = (radius, fraction) => {
                const angle = (fraction * 360 - 90) * Math.PI / 180;
                return { x: c + radius * Math.cos(angle), y: c + radius * Math.sin(angle) };
            };

            // rings
            radii.forEach((r, i) => {
                svg.appendChild(svgEl('circle', {
                    class: 'wheel-ring-track', cx: c, cy: c, r: r,
                    'stroke-width': i === 0 ? 10 : 8
                }));
                svg.appendChild(svgEl('circle', {
                    class: 'wheel-ring-glow', cx: c, cy: c, r: r,
                    stroke: ['#6366f1', '#a78bfa', '#ec4899'][i],
                    'stroke-width': 1.5, 'stroke-dasharray': '1 7'
                }));
            });

            // month ticks + labels on the outer ring
            for (let m = 0; m < 12; m++) {
                const fraction = (Date.UTC(CALENDAR_YEAR, m, 1) - YEAR_START) / (YEAR_END - YEAR_START);
                const a = point(radii[0] - 12, fraction);
                const b = point(radii[0] + 12, fraction);
                svg.appendChild(svgEl('line', { class: 'wheel-tick', x1: a.x, y1: a.y, x2: b.x, y2: b.y }));

                const mid = (Date.UTC(CALENDAR_YEAR, m, 15) - YEAR_START) / (YEAR_END - YEAR_START);
                const label = point(radii[0] + 30, mid);
                const text = svgEl('text', {
                    class: 'wheel-month-label',
                    x: label.x, y: label.y + 4, 'text-anchor': 'middle'
                });
                text.textContent = this.t.monthsShort[m];
                svg.appendChild(text);
            }

            // rotating sweep line
            if (!REDUCED_MOTION) {
                const sweepGroup = svgEl('g', { class: 'wheel-sweep' });
                sweepGroup.appendChild(svgEl('line', {
                    x1: c, y1: c, x2: c, y2: c - radii[0],
                    stroke: 'url(#wheelSweep)', 'stroke-width': 2
                }));
                svg.appendChild(sweepGroup);
            }

            // centre: "you are here"
            svg.appendChild(svgEl('circle', { cx: c, cy: c, r: 62, fill: 'url(#wheelCore)' }));
            svg.appendChild(svgEl('circle', {
                class: 'wheel-pulse', cx: c, cy: c, r: 16,
                fill: 'none', stroke: '#f9a8d4', 'stroke-width': 1.5
            }));
            svg.appendChild(svgEl('circle', { cx: c, cy: c, r: 5, fill: '#fff' }));
            const centre = svgEl('text', {
                class: 'wheel-center-title', x: c, y: c + 34, 'text-anchor': 'middle'
            });
            centre.textContent = this.t.ui.wheelNow;
            svg.appendChild(centre);

            // event nodes
            const visible = new Set(events.map(e => e.order));
            this.events.forEach(event => {
                const ring = this.ringOf(event);
                const pos = point(radii[ring], this.ringFraction(event, ring));
                const color = this.color(event.category);

                const group = svgEl('g', {
                    class: 'wheel-node' + (visible.has(event.order) ? '' : ' is-dimmed'),
                    tabindex: visible.has(event.order) ? '0' : '-1',
                    role: 'button'
                });
                group.appendChild(svgEl('circle', {
                    class: 'wheel-halo', cx: pos.x, cy: pos.y, r: 15,
                    fill: color, 'fill-opacity': '.28'
                }));
                group.appendChild(svgEl('circle', {
                    class: 'wheel-dot', cx: pos.x, cy: pos.y, r: 4.5,
                    fill: color, stroke: '#070915', 'stroke-width': 1.5
                }));
                group.appendChild(svgEl('circle', {
                    class: 'wheel-dot-hit', cx: pos.x, cy: pos.y, r: 14
                }));

                const label = event.title[this.lang] + ' — ' + this.formatDate(event);
                group.appendChild(svgEl('title')).textContent = label;

                if (visible.has(event.order)) {
                    const open = () => this.openModal(event.order);
                    group.addEventListener('click', open);
                    group.addEventListener('keydown', e => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
                    });
                    group.addEventListener('pointerenter', () => this.showTip(event, pos, size));
                    group.addEventListener('focus', () => this.showTip(event, pos, size));
                    group.addEventListener('pointerleave', () => this.hideTip());
                    group.addEventListener('blur', () => this.hideTip());
                }
                svg.appendChild(group);
            });

            wrap.appendChild(svg);

            const tip = document.createElement('div');
            tip.className = 'wheel-tip';
            tip.innerHTML = '<b></b><span></span>';
            wrap.appendChild(tip);
            this.dom.wheelTip = tip;
        }

        showTip(event, pos, size) {
            const tip = this.dom.wheelTip;
            if (!tip) return;
            const rect = this.dom.wheel.getBoundingClientRect();
            $('b', tip).textContent = event.title[this.lang];
            $('span', tip).textContent = this.formatDate(event);
            tip.style.left = (pos.x / size) * rect.width + 'px';
            tip.style.top = (pos.y / size) * rect.height + 'px';
            tip.classList.add('is-visible');
        }

        hideTip() {
            if (this.dom.wheelTip) this.dom.wheelTip.classList.remove('is-visible');
        }

        /* ---- calendar ---------------------------------------------- */

        stepMonth(direction) {
            this.month = (this.month + direction + 12) % 12;
            this.renderCalendar();
        }

        renderCalendar(events) {
            const list = events || this.filtered;
            const t = this.t;
            this.dom.calendarMonth.textContent = t.months[this.month];

            // month dots
            this.dom.monthDots.innerHTML = '';
            for (let m = 0; m < 12; m++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'month-dot';
                dot.dataset.month = m;
                dot.title = t.months[m];
                dot.setAttribute('aria-label', t.months[m]);
                if (list.some(e => e.month === m + 1)) dot.classList.add('has-events');
                if (m === this.month) dot.classList.add('is-active');
                this.dom.monthDots.appendChild(dot);
            }

            const daysInMonth = new Date(Date.UTC(CALENDAR_YEAR, this.month + 1, 0)).getUTCDate();
            const monthEvents = list.filter(e => e.month === this.month + 1);

            const frag = document.createDocumentFragment();
            for (let day = 1; day <= daysInMonth; day++) {
                const onDay = monthEvents.filter(e => e.day === day);
                const cell = document.createElement(onDay.length ? 'button' : 'div');
                cell.className = 'calendar-day';
                cell.style.setProperty('--i', day);

                if (onDay.length) {
                    const category = onDay[0].category;
                    cell.type = 'button';
                    cell.classList.add('has-event');
                    cell.style.setProperty('--cat', this.color(category));
                    cell.innerHTML =
                        '<span class="day-number">' + day + '</span>' +
                        '<svg class="icon day-icon" aria-hidden="true"><use href="' +
                        this.iconId(category) + '"/></svg>' +
                        (onDay.length > 1 ? '<span class="day-count">' + onDay.length + '</span>' : '');
                    cell.setAttribute('aria-label',
                        this.formatDate(onDay[0]) + ' — ' + onDay.map(e => e.title[this.lang]).join(', '));
                    cell.addEventListener('click', () => this.openModal(onDay[0].order));
                } else {
                    cell.innerHTML = '<span class="day-number">' + day + '</span>';
                }
                frag.appendChild(cell);
            }
            this.dom.calendarGrid.replaceChildren(frag);

            const empty = monthEvents.length === 0;
            this.dom.calendarEmpty.hidden = !empty;
            $('p', this.dom.calendarEmpty).textContent =
                (this.query || this.category !== 'all') ? t.ui.noResultsHint : t.ui.emptyMonth;
        }

        /* ----------------------------------------------------------- */
        /* modal                                                       */
        /* ----------------------------------------------------------- */

        openModal(order) {
            this.activeIndex = order;
            this.lastFocused = document.activeElement;
            this.fillModal();
            this.dom.modal.hidden = false;
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => this.dom.modalClose.focus());
        }

        closeModal() {
            this.dom.modal.hidden = true;
            document.body.style.overflow = '';
            if (this.lastFocused && this.lastFocused.focus) this.lastFocused.focus();
        }

        stepEvent(direction) {
            const next = this.activeIndex + direction;
            if (next < 0 || next >= this.events.length) return;
            this.activeIndex = next;
            this.fillModal();
        }

        fillModal() {
            const event = this.events[this.activeIndex];
            if (!event) return;
            const d = this.dom;
            const color = this.color(event.category);

            d.modalCard.style.setProperty('--cat', color);
            d.modalIconUse.setAttribute('href', this.iconId(event.category));
            d.modalBadge.textContent = this.t.categories[event.category];
            d.modalTitle.textContent = event.title[this.lang];
            d.modalDate.textContent = this.formatDate(event);
            d.modalDesc.textContent = event.description[this.lang];
            d.modalCosmic.textContent = this.formatDate(event);
            d.modalReal.textContent = this.formatYearsAgo(event.yearsAgo);

            const percent = this.yearFraction(event) * 100;
            const shown = percent >= 99.99 && percent < 100
                ? '99,99'
                : this.formatNumber(percent, percent > 99 ? 3 : 1);
            d.modalProgressValue.textContent = shown + '%';
            d.modalProgressFill.style.width = Math.max(percent, 1.5) + '%';

            d.modalPrev.disabled = this.activeIndex === 0;
            d.modalNext.disabled = this.activeIndex === this.events.length - 1;
        }

        trapFocus(e) {
            const focusables = $$(
                'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])',
                this.dom.modalCard
            ).filter(el => el.offsetParent !== null);
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        /* ----------------------------------------------------------- */
        /* scroll, reveal, counters                                    */
        /* ----------------------------------------------------------- */

        initReveal() {
            if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
                $$('.reveal').forEach(el => el.classList.add('is-visible'));
                this.revealObserver = null;
                return;
            }
            this.revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

            $$('.reveal').forEach(el => this.revealObserver.observe(el));
        }

        observeReveal(root) {
            if (!this.revealObserver) {
                $$('.reveal', root).forEach(el => el.classList.add('is-visible'));
                return;
            }
            $$('.reveal', root).forEach(el => this.revealObserver.observe(el));
        }

        initScroll() {
            let ticking = false;
            const onScroll = () => {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(() => {
                    this.updateScrollUi();
                    ticking = false;
                });
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onScroll, { passive: true });
            this.updateScrollUi();
        }

        updateScrollUi() {
            const d = this.dom;
            const doc = document.documentElement;
            const scrolled = window.scrollY || doc.scrollTop || 0;
            const max = Math.max(doc.scrollHeight - doc.clientHeight, 1);
            const percent = clamp((scrolled / max) * 100, 0, 100);

            d.readProgress.style.width = percent + '%';
            d.footerFill.style.width = percent + '%';
            d.footerThumb.style.left = percent + '%';
            d.header.classList.toggle('is-stuck', scrolled > 12);
            d.toTop.classList.toggle('is-visible', scrolled > 600);

            // fill the timeline rail as its items scroll past the middle of the screen
            if (d.timeline && d.timeline.offsetParent !== null) {
                const rect = d.timeline.getBoundingClientRect();
                const middle = window.innerHeight * 0.55;
                const ratio = clamp((middle - rect.top) / Math.max(rect.height, 1), 0, 1);
                d.timelineRailFill.style.height = (ratio * 100) + '%';
            }
        }

        initCounters() {
            const nodes = $$('.js-counter');
            if (!nodes.length) return;

            const run = node => {
                const target = parseFloat(node.dataset.target);
                const decimals = Number(node.dataset.decimals || 0);
                if (REDUCED_MOTION) {
                    node.textContent = this.formatNumber(target, decimals);
                    return;
                }
                const duration = 1800;
                const start = performance.now();
                const tick = now => {
                    const p = clamp((now - start) / duration, 0, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    node.textContent = this.formatNumber(target * eased, decimals);
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            };

            nodes.forEach(node => {
                if (!('IntersectionObserver' in window)) { run(node); return; }
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) { run(entry.target); obs.disconnect(); }
                    });
                }, { threshold: 0.4 });
                observer.observe(node);
            });
        }
    }

    /* --------------------------------------------------------------- */

    document.addEventListener('DOMContentLoaded', () => {
        const canvas = $('#starfield');
        if (canvas && canvas.getContext) new Starfield(canvas);
        window.cosmicCalendar = new CosmicCalendar();
    });
})();
