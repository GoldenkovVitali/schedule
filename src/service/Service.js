export default class Service {
  constructor() {
    this.base = 'https://rs-react-schedule.firebaseapp.com/api/team/18';
  }

  getResource = async (url) => {
    const res = await fetch(`${this.base}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllEvents = async () => {
    const res = await this.getResource('/events');
    return res.data.map(this._transformEvent);
  }

  getEvent = async (id) => {
    const event = await this.getResource(`/event/${id}`);
    return this._transformEvent(event);
  }

  getAllOrganizers = async () => {
    const res = await this.getResource('/organizers');
    return res.data.map(this._transformOrganizer);
  }

  getOrganizer = async (id) => {
    const organizer = await this.getResource(`/organizer/${id}`);
    return this._transformOrganizer(organizer);
  }

  postEvent = async ({name = 'no data', description = 'no data', descriptionUrl = 'no data', type = 'no data', timeZone = 'no data', dateTime = 'no data', place = 'no data', comment = 'no data'}) => {
    let url = '/event';
    let data = {
      name,
      description,
      descriptionUrl,
      type,
      timeZone,
      dateTime,
      place,
      comment,
      ...args,
    };

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      const resId = JSON.stringify(json);
      console.log('Успех:', resId);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  postOrganizer = async ({ name = 'no data' }) => {
    const url = '/organizer';
    const data = {
      name,
    };
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
  }

  updateEvent = async (id, {
    name = 'no data', description = 'no data', descriptionUrl = 'no data', type = 'no data', timeZone = 'no data', dateTime = 'no data', place = 'no data', comment = 'no data', video = 'no data', image = 'no data', link = 'no data', lng = 'no data', lat = 'no data', zoom = 'no data',
  }) => {
    const url = `/event/${id}`;
    const data = {
      name,
      description,
      descriptionUrl,
      type,
      timeZone,
      dateTime,
      place,
      comment,
      video,
      image,
      link,
      lng,
      lat,
      zoom,
    };

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
  }

  updateOrganizer = async (id, { name }) => {
    const url = `/organizer/${id}`;

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
  }

  deleteEvent = async (id) => {
    const url = `/event/${id}`;

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'DELETE',
      });
      const json = await response.json();
      console.log('Удалено:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  deleteOrganizer = async (id) => {
    const url = `/organizer/${id}`;

    try {
      const response = await fetch(`${this.base}${url}`, {
        method: 'DELETE',
      });
      const json = await response.json();
      console.log('Удалено:', JSON.stringify(json));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }


  isSet(data) {
    if (data) {
      return data;
    }
    return 'no data :(';
  }

  _transformEvent = (event) => {
    const eventKeys = Object.keys(event);
    eventKeys.forEach((key) => event[key] = this.isSet(event[key]));

    return event;

    // return {
    //   id: this.isSet(event.id),
    //   name: this.isSet(event.name),
    //   description: this.isSet(event.description),
    //   descriptionUrl: this.isSet(event.descriptionUrl),
    //   type: this.isSet(event.type), 
    //   timeZone: this.isSet(event.timeZone),
    //   dateTime: this.isSet(event.dateTime),
    //   place: this.isSet(event.place),
    //   comment: this.isSet(event.comment),
    // };
  }
}
