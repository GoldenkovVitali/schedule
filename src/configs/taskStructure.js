const taskStructure = {
  default: {
    type: true,
    header: true,
    date: {      
      isStartDate: true,
      isStartTime: true,
      isDeadlineDate: true,
    },
    lectureDescription: true,
    image: true,
    video: true,
    link: true,
    taskDescription: true,
    map: true,
    organizer: true,
    feedback: true,
  },

  jsTask: {
    type: true,
    header: true,
    date: {      
      isStartDate: true,
      isStartTime: false,
      isDeadlineDate: true,
    },
    lectureDescription: false,
    image: true,
    video: false,
    link: true,
    taskDescription: true,
    map: false,
    organizer: true,
    feedback: true,
  },

  htmltask: {
    type: true,
    header: true,
    date: {      
      isStartDate: true,
      isStartTime: false,
      isDeadlineDate: true,
    },
    lectureDescription: false,
    image: true,
    video: false,
    link: true,
    taskDescription: true,
    map: false,
    organizer: true,
    feedback: true,
  },

  codejam: {
    type: true,
    header: true,
    date: {      
      isStartDate: true,
      isStartTime: false,
      isDeadlineDate: true,
    },
    lectureDescription: false,
    image: true,
    video: false,
    link: true,
    taskDescription: true,
    map: false,
    organizer: true,
    feedback: true,
  },

  externaltask: {
    type: true,
    header: true,
    date: {      
      isStartDate: true,
      isStartTime: false,
      isDeadlineDate: true,
    },
    lectureDescription: false,
    image: true,
    video: false,
    link: true,
    taskDescription: true,
    map: false,
    organizer: true,
    feedback: true,
  },

  lectureOnline: {
    type: true,
    header: true,
    date: {      
      isStartDate: true,
      isStartTime: true,
      isDeadlineDate: false,
    },
    lectureDescription: true,
    image: false,
    video: true,
    link: true,
    taskDescription: false,
    map: false,
    organizer: true,
    feedback: true,
  },

  lectureOffline: {
    type: true,
    header: true,
    date: {      
      isStartDate: true,
      isStartTime: true,
      isDeadlineDate: false,
    },
    lectureDescription: true,
    image: false,
    video: false,
    link: true,
    taskDescription: false,
    map: true,
    organizer: true,
    feedback: true,
  },

  codewars: {
    type: true,
    header: true,
    date: {      
      isStartDate: true,
      isStartTime: false,
      isDeadlineDate: true,
    },
    lectureDescription: false,
    image: false,
    video: false,
    link: true,
    taskDescription: true,
    map: false,
    organizer: true,
    feedback: true,
  },
}
  
export default taskStructure;
  