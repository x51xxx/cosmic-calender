// Cosmic Calendar Visualization Script

let currentView = 'year'; // year, month, day
let selectedMonth = null;
let selectedDay = null;

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', () => {
    renderYearView();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('zoom-in').addEventListener('click', zoomIn);
    document.getElementById('zoom-out').addEventListener('click', zoomOut);
    document.getElementById('reset-view').addEventListener('click', resetView);
}

function renderYearView() {
    currentView = 'year';
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    calendar.className = 'calendar year-view';

    const yearContainer = document.createElement('div');
    yearContainer.className = 'year-container';

    for (let month = 0; month < 12; month++) {
        const monthElement = createMonthElement(month);
        yearContainer.appendChild(monthElement);
    }

    calendar.appendChild(yearContainer);
}

function createMonthElement(monthIndex) {
    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';
    monthDiv.dataset.month = monthIndex;

    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';
    monthHeader.textContent = monthsUA[monthIndex];
    monthDiv.appendChild(monthHeader);

    const monthGrid = document.createElement('div');
    monthGrid.className = 'month-grid';

    const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();
    
    // Get events for this month
    const monthEvents = cosmicEvents.filter(event => {
        const [month] = event.date.split('-').map(Number);
        return month - 1 === monthIndex;
    });

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        // Check if this day has events
        const dayEvents = monthEvents.filter(event => {
            const [, eventDay] = event.date.split('-').map(Number);
            return eventDay === day;
        });

        if (dayEvents.length > 0) {
            dayElement.classList.add('has-event');
            const primaryEvent = dayEvents[0];
            dayElement.style.backgroundColor = categoryColors[primaryEvent.category];
            dayElement.title = primaryEvent.title;
            
            dayElement.addEventListener('click', () => {
                showEventDetails(dayEvents);
            });
        }

        const dayNumber = document.createElement('span');
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);

        monthGrid.appendChild(dayElement);
    }

    monthDiv.appendChild(monthGrid);

    // Make month clickable to zoom in
    monthHeader.addEventListener('click', () => {
        renderMonthView(monthIndex);
    });

    return monthDiv;
}

function renderMonthView(monthIndex) {
    currentView = 'month';
    selectedMonth = monthIndex;
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    calendar.className = 'calendar month-view';

    const monthContainer = document.createElement('div');
    monthContainer.className = 'month-container';

    const monthTitle = document.createElement('h2');
    monthTitle.textContent = monthsUA[monthIndex];
    monthContainer.appendChild(monthTitle);

    const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();
    const monthEvents = cosmicEvents.filter(event => {
        const [month] = event.date.split('-').map(Number);
        return month - 1 === monthIndex;
    });

    const timeline = document.createElement('div');
    timeline.className = 'timeline';

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = monthEvents.filter(event => {
            const [, eventDay] = event.date.split('-').map(Number);
            return eventDay === day;
        });

        const dayElement = document.createElement('div');
        dayElement.className = 'timeline-day';
        
        const dayLabel = document.createElement('div');
        dayLabel.className = 'day-label';
        dayLabel.textContent = `${day} ${monthsUA[monthIndex]}`;
        dayElement.appendChild(dayLabel);

        if (dayEvents.length > 0) {
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'timeline-event';
                eventElement.style.backgroundColor = categoryColors[event.category];
                
                const eventTitle = document.createElement('div');
                eventTitle.className = 'event-title';
                eventTitle.textContent = event.title;
                
                const eventTime = document.createElement('div');
                eventTime.className = 'event-time';
                eventTime.textContent = event.time || '00:00';
                
                eventElement.appendChild(eventTitle);
                eventElement.appendChild(eventTime);
                
                eventElement.addEventListener('click', () => {
                    showEventDetails([event]);
                });
                
                dayElement.appendChild(eventElement);
            });
        }

        timeline.appendChild(dayElement);
    }

    monthContainer.appendChild(timeline);
    calendar.appendChild(monthContainer);
}

function showEventDetails(events) {
    const detailsPanel = document.getElementById('event-details');
    const contentDiv = document.getElementById('event-content');
    
    contentDiv.innerHTML = '';
    
    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-detail-item';
        
        const colorBar = document.createElement('div');
        colorBar.className = 'event-color-bar';
        colorBar.style.backgroundColor = categoryColors[event.category];
        
        const title = document.createElement('h4');
        title.textContent = event.title;
        
        const titleEn = document.createElement('p');
        titleEn.className = 'event-title-en';
        titleEn.textContent = event.titleEn;
        
        const dateTime = document.createElement('p');
        dateTime.className = 'event-datetime';
        const [month, day] = event.date.split('-').map(Number);
        dateTime.textContent = `📅 ${day} ${monthsUA[month - 1]}${event.time ? `, ${event.time}` : ''}`;
        
        const description = document.createElement('p');
        description.className = 'event-description';
        description.textContent = event.description;
        
        eventDiv.appendChild(colorBar);
        eventDiv.appendChild(title);
        eventDiv.appendChild(titleEn);
        eventDiv.appendChild(dateTime);
        eventDiv.appendChild(description);
        
        contentDiv.appendChild(eventDiv);
    });
    
    detailsPanel.classList.add('active');
}

function zoomIn() {
    if (currentView === 'year') {
        // Zoom into December (most activity)
        renderMonthView(11);
    } else if (currentView === 'month' && selectedMonth === 11) {
        // Could implement day view for December 31
        alert('Максимальне збільшення досягнуто');
    }
}

function zoomOut() {
    if (currentView === 'month') {
        renderYearView();
    }
}

function resetView() {
    renderYearView();
    document.getElementById('event-details').classList.remove('active');
}

// Add smooth scrolling and animations
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('day') || e.target.classList.contains('timeline-event')) {
        e.target.style.transform = 'scale(1.05)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 200);
    }
});
