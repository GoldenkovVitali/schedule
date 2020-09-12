export default class Service {
  constructor() {
    this.base = 'https://rs-react-schedule.firebaseapp.com/api/team/18';
  }

  getResource = async url => {
    const res = await fetch(`${this.base}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllEvents = async () => {
    const res = await this.getResource(`/events`);
    return res.data;
  };

  getEvent = async id => {
    const event = await this.getResource(`/event/${id}`);
    return event;
  };

  getAllOrganizers = async () => {
    const res = await this.getResource(`/organizers`);
    return res.data;
  };

  getOrganizer = async id => {
    const organizer = await this.getResource(`/organizer/${id}`);
    return organizer;
  };

  postEvent = async obj => {
    let url = '/event';
    let data = obj;

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  postOrganizer = async (obj) => {
    let url = '/organizer';
    let data = obj

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log('Успех:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  updateEvent = async (obj) => {
    let url = `/event/${obj.id}`;
    let data = JSON.parse(JSON.stringify(obj));

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log('Обновлено:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  updateOrganizer = async (id, { name }) => {
    let url = `/organizer/${id}`;

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const json = await response.json();
      console.log('Обновлено:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  deleteEvent = async id => {
    let url = `/event/${id}`;

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'DELETE',
      });
      const json = await response.json();
      console.log('Удалено:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  deleteOrganizer = async id => {
    let url = `/organizer/${id}`;

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'DELETE',
      });
      const json = await response.json();
      console.log('Удалено:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  isSet(data) {
    if (data) {
      return data;
    } else {
      return 'no data :(';
    }
  }

  _transformOrganizer = organizer => {
    return {
      id: this.isSet(organizer.id),
      name: this.isSet(organizer.name),
    };
  };

  _transformEvent = event => {
    return {
      id: this.isSet(event.id),
      key: this.isSet(event.key),
      name: this.isSet(event.name),
      description: this.isSet(event.description),
      descriptionUrl: this.isSet(event.descriptionUrl),
      type: this.isSet(event.type),
      timeZone: this.isSet(event.timeZone),
      dateTime: this.isSet(event.dateTime),
      place: this.isSet(event.place),
      comment: this.isSet(event.comment),
    };
  };
}
