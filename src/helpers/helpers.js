const helpers = {
  getTableSettings: (title) => {
    const settings = JSON.parse(localStorage.getItem('tableSettings'))
    if(settings){
      console.log(settings[title])
      return settings[title];
    } else {
      return null;
    }
  },

  setTableSettings: (title, value) => {
    const settings = JSON.parse(localStorage.getItem('tableSettings'))
    if(settings){
      const newSettings = {
        ...settings,
        [title]: value
      }
      console.log(title, value)
      localStorage.setItem('tableSettings', JSON.stringify(newSettings))
    }
  }
};

export default helpers;
