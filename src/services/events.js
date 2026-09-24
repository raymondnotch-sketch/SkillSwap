export async function getEvents() {
  return [];
}

export async function getEventFilters() {
  return [
    { key: 'all', label: 'All Events' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'workshop', label: 'Workshops' },
    { key: 'webinar', label: 'Webinars' },
  ];
}
