// import axios from 'axios';

// axios.defaults.baseURL="http://localhost:5117";
// export default {
//   getTasks: async () => {
//     const result = await axios.get(`/tasks`)    
//     return result.data;
//   },
//   addTask: async(name)=>{
//     console.log('addTask', name)
//     const result = await axios.post(`/tasks`, { name });
//     return result.data;
//   },
//   setCompleted: async (id, isComplete) => {
//     console.log('setCompleted', { id, isComplete });
//     const answer = await axios.get(`/tasks`);
//     const item = answer.data.find(item => item.id === parseInt(id));
//     if (!item) {
//       console.error(`Item with id ${id} not found.`);
//       return null;
//     }
//     const result = await axios.put(`/tasks/${id}`, {
//       Id: item.id,
//       Name: item.name,
//       IsComplete: isComplete     
//     });
//     return result.data;
//   },
  
//   deleteTask:async(id)=>{
//     console.log('deleteTask')
//     const result = await axios.delete(`/tasks/${id}`);
//     return result.data;
//   }
// };




import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5117";

export default {
  getTasks: async () => {
    const result = await axios.get(`/tasks`);
    return result.data;
  },
  addTask: async (name) => {
    console.log('addTask', name)
    const result = await axios.post(`/tasks`, { name });
    return result.data;
  },
  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    const answer = await axios.get(`/tasks`);
    const item = answer.data.find(item => item.id === parseInt(id));
    if (!item) {
      console.error(`Item with id ${id} not found.`);
      return null;
    }
    const result = await axios.put(`/tasks/${id}`, {
      Id: item.id,
      Name: item.name,
      IsComplete: isComplete
    });
    return result.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask');
    try {
      const result = await axios.delete(`/tasks/${id}`);
      return result.data;
    } catch (error) {
      console.error('An error occurred in deleteTask:', error);
      throw error;
    }
  }
};
