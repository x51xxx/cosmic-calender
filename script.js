// Cosmic Calendar Interactive Application
// Main application logic

class CosmicCalendar {
    constructor() {
        this.currentLang = 'uk';
        this.currentView = 'timeline';
        this.currentMonth = 0; // 0-11 for January-December
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCurrentView();
        this.updateLanguage();
    }

    setupEventListeners() {
        // Language switching
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });

        // View switching
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // Calendar navigation
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateMonth(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateMonth(1));
        }

        // Modal close
        const modalClose = document.getElementById('modal-close');
        const modal = document.getElementById('event-modal');

        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;

        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        this.updateLanguage();
        this.renderCurrentView();
    }

    updateLanguage() {
        const t = TRANSLATIONS[this.currentLang];

        // Update static text
        if (this.currentLang === 'uk') {
            document.querySelector('.title').innerHTML = '<span class="cosmic-icon">🌌</span> Космічний Календар';
            document.querySelector('.subtitle').textContent = '13,8 мільярдів років історії Всесвіту на шкалі одного року';
        } else {
            document.querySelector('.title').innerHTML = '<span class="cosmic-icon">🌌</span> Cosmic Calendar';
            document.querySelector('.subtitle').textContent = '13.8 billion years of Universe history on the scale of one year';
        }

        // Update view buttons
        const viewButtons = document.querySelectorAll('.view-btn');
        if (viewButtons.length >= 3) {
            viewButtons[0].innerHTML = `<span>📊</span> ${t.ui.timeline}`;
            viewButtons[1].innerHTML = `<span>📅</span> ${t.ui.calendar}`;
            viewButtons[2].innerHTML = `<span>📋</span> ${t.ui.list}`;
        }
    }

    switchView(view) {
        this.currentView = view;

        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Update visible container
        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.remove('active');
        });

        this.renderCurrentView();
    }

    renderCurrentView() {
        const container = document.getElementById(`${this.currentView}-view`);
        if (container) {
            container.classList.add('active');
        }

        switch (this.currentView) {
            case 'timeline':
                this.renderTimeline();
                break;
            case 'calendar':
                this.renderCalendar();
                break;
            case 'list':
                this.renderList();
                break;
        }
    }

    renderTimeline() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        timeline.innerHTML = '';

        // Sort events by date
        const sortedEvents = [...COSMIC_EVENTS].sort((a, b) => {
            return this.getEventTimestamp(a) - this.getEventTimestamp(b);
        });

        sortedEvents.forEach(event => {
            const eventEl = this.createTimelineEvent(event);
            timeline.appendChild(eventEl);
        });
    }

    createTimelineEvent(event) {
        const div = document.createElement('div');
        div.className = 'timeline-event';
        div.style.borderLeftColor = CATEGORY_COLORS[event.category] || '#6366f1';

        const date = this.formatDate(event);
        const title = event.title[this.currentLang];
        const description = event.description[this.currentLang];

        div.innerHTML = `
            <div class="event-date">${date}</div>
            <h3 class="event-title">${title}</h3>
            <p class="event-description">${description}</p>
        `;

        div.addEventListener('click', () => this.showEventModal(event));

        return div;
    }

    renderCalendar() {
        const grid = document.getElementById('calendar-grid');
        const monthTitle = document.getElementById('current-month');

        if (!grid || !monthTitle) return;

        const t = TRANSLATIONS[this.currentLang];
        monthTitle.textContent = t.months[this.currentMonth];

        grid.innerHTML = '';

        // Get days in month (cosmic calendar year)
        const daysInMonth = new Date(2024, this.currentMonth + 1, 0).getDate();

        // Filter events for this month
        const monthEvents = COSMIC_EVENTS.filter(e => e.month === this.currentMonth + 1);

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';

            const eventsOnDay = monthEvents.filter(e => e.day === day);

            if (eventsOnDay.length > 0) {
                dayEl.classList.add('has-event');
                dayEl.style.borderColor = CATEGORY_COLORS[eventsOnDay[0].category];

                dayEl.addEventListener('click', () => {
                    if (eventsOnDay.length === 1) {
                        this.showEventModal(eventsOnDay[0]);
                    } else {
                        // Show first event if multiple
                        this.showEventModal(eventsOnDay[0]);
                    }
                });
            }

            dayEl.innerHTML = `
                <div class="day-number">${day}</div>
                ${eventsOnDay.length > 0 ? `<div class="event-count">${eventsOnDay.length}</div>` : ''}
            `;

            grid.appendChild(dayEl);
        }
    }

    renderList() {
        const listEl = document.getElementById('events-list');
        if (!listEl) return;

        listEl.innerHTML = '';

        // Sort events by date
        const sortedEvents = [...COSMIC_EVENTS].sort((a, b) => {
            return this.getEventTimestamp(a) - this.getEventTimestamp(b);
        });

        sortedEvents.forEach(event => {
            const eventEl = this.createListEvent(event);
            listEl.appendChild(eventEl);
        });
    }

    createListEvent(event) {
        const div = document.createElement('div');
        div.className = 'list-event';
        div.style.borderLeftColor = CATEGORY_COLORS[event.category];
        div.style.borderLeftWidth = '4px';

        const date = this.formatDate(event);
        const title = event.title[this.currentLang];
        const description = event.description[this.currentLang];
        const t = TRANSLATIONS[this.currentLang];

        div.innerHTML = `
            <div class="event-date">${date}</div>
            <h3 class="event-title">${title}</h3>
            <p class="event-description">${description}</p>
            <div style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.85rem;">
                ${this.formatYearsAgo(event.yearsAgo)}
            </div>
        `;

        div.addEventListener('click', () => this.showEventModal(event));

        return div;
    }

    navigateMonth(direction) {
        this.currentMonth += direction;

        if (this.currentMonth < 0) {
            this.currentMonth = 11;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
        }

        this.renderCalendar();
    }

    showEventModal(event) {
        const modal = document.getElementById('event-modal');
        const title = document.getElementById('modal-title');
        const date = document.getElementById('modal-date');
        const description = document.getElementById('modal-description');
        const cosmicTime = document.getElementById('modal-cosmic-time');
        const realTime = document.getElementById('modal-real-time');

        if (!modal) return;

        const t = TRANSLATIONS[this.currentLang];

        title.textContent = event.title[this.currentLang];
        date.textContent = this.formatDate(event);
        description.textContent = event.description[this.currentLang];
        cosmicTime.textContent = this.formatCosmicTime(event);
        realTime.textContent = this.formatYearsAgo(event.yearsAgo);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('event-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    formatDate(event) {
        const t = TRANSLATIONS[this.currentLang];
        const month = t.months[event.month - 1];

        if (event.hour !== undefined && event.hour !== 0) {
            return `${event.day} ${month}, ${String(event.hour).padStart(2, '0')}:${String(event.minute).padStart(2, '0')}:${String(event.second).padStart(2, '0')}`;
        }

        return `${event.day} ${month}`;
    }

    formatCosmicTime(event) {
        const t = TRANSLATIONS[this.currentLang];
        const month = t.months[event.month - 1];

        if (event.hour !== undefined && event.hour !== 0) {
            return `${event.day} ${month}, ${String(event.hour).padStart(2, '0')}:${String(event.minute).padStart(2, '0')}:${String(event.second).padStart(2, '0')}`;
        }

        return `${event.day} ${month}`;
    }

    formatYearsAgo(years) {
        const t = TRANSLATIONS[this.currentLang];

        if (years === 0) {
            return this.currentLang === 'uk' ? 'Сьогодення' : 'Present';
        }

        if (years >= 1000000000) {
            const billions = (years / 1000000000).toFixed(2);
            return this.currentLang === 'uk'
                ? `${billions} млрд років тому`
                : `${billions} billion years ago`;
        }

        if (years >= 1000000) {
            const millions = (years / 1000000).toFixed(1);
            return this.currentLang === 'uk'
                ? `${millions} млн років тому`
                : `${millions} million years ago`;
        }

        if (years >= 1000) {
            const thousands = (years / 1000).toFixed(0);
            return this.currentLang === 'uk'
                ? `${thousands} тис. років тому`
                : `${thousands} thousand years ago`;
        }

        return `${years} ${t.ui.yearsAgo}`;
    }

    getEventTimestamp(event) {
        const month = event.month - 1;
        const day = event.day;
        const hour = event.hour || 0;
        const minute = event.minute || 0;
        const second = event.second || 0;

        return new Date(2024, month, day, hour, minute, second).getTime();
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cosmicCalendar = new CosmicCalendar();
});

// Add some visual effects on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.stars, .stars2, .stars3');

    stars.forEach((star, index) => {
        const speed = (index + 1) * 0.5;
        star.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
