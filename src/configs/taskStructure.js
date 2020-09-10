// PS: we can remove keys with value 'false'

const taskStructure = {
  default: {
    type: true,
    header: true,
    date: {      
      startDate: true,
      startTime: true,
      deadline: true,
    },
    lectureDescription: true,
    image: true,
    video: true,
    link: true,
    taskDescription: true,
    map: true,
    organizer: true,
    // organizerInfo: true,
    feedback: true,
  },

  jsTask: {
    type: true,
    header: true,
    date: {      
      startDate: true,
      startTime: false,
      deadline: true,
    },
    lectureDescription: false,
    image: true,
    video: false,
    link: true,
    taskDescription: true,
    map: false,
    organizer: true,
    // organizerInfo: true,
    feedback: true,
  },

  lectureOnline: {
    type: true,
    header: true,
    date: {      
      startDate: true,
      startTime: true,
      deadline: false,
    },
    lectureDescription: true,
    image: false,
    video: true,
    link: true,
    taskDescription: false,
    map: false,
    organizer: true,
    // organizerInfo: true,
    feedback: true,
  }
}
  
export default taskStructure;
  