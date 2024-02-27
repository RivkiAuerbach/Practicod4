import axios from 'axios';

const apiUrl = "http://localhost:5117"

// // Config Defaults - הגדרת כתובת API כ-default
// axios.defaults.baseURL = apiUrl;

// // Interceptor לטיפול בשגיאות ב-response
// axios.interceptors.response.use(
//   (response) => response, // אם התקבל response בהצלחה, החזר את ה-response כמו שהוא
//   (error) => {
//     // אם קיבלנו שגיאה ב-response, עבור על השגיאה ורושם ללוג
//     console.error('Error in API response:', error.response);
//     return Promise.reject(error);
//   }
// );

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/tasks`)    
    return result.data;
  },
  addTask: async(name)=>{
    console.log('addTask', name)
    const result = await axios.post(`${apiUrl}/tasks`, { name });
    return result.data;
    // return {};
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    const result = await axios.put(`${apiUrl}/tasks/${id}`, { isComplete });
    return result.data;
    // return {};
  },

  deleteTask:async(id)=>{
    console.log('deleteTask')
    const result = await axios.delete(`${apiUrl}/tasks/${id}`);
    return result.data;
  }
};





// import axios from 'axios';

// // הגדרת כתובת ה-API כ-default עם ה-port הנכון
// axios.defaults.baseURL = "http://localhost:5117";

// // הוספת interceptor שתופס את השגיאות ב-response ורושם ללוג
// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     console.error('Request failed:', error.message);
//     return Promise.reject(error);
//   }
// );

// const TaskService = {
//   getTasks: async () => {
//     try {
//       const result = await axios.get('/tasks');
//       return result.data;
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       throw error;
//     }
//   },

//   addTask: async (name) => {
//     try {
//       const result = await axios.post('/task', { name});
//       return result.data;
//     } catch (error) {
//       console.error('Error adding task:', error);
//       throw error;
//     }
//   },

//   setCompleted: async (id, isComplete) => {
//     try {
//       const result = await axios.put(`/task/${id}`, { isComplete });
//       return result.data;
//     } catch (error) {
//       console.error('Error setting task completion:', error);
//       throw error;
//     }
//   },

//   deleteTask: async (id) => {
//     try {
//       await axios.delete(`/task/${id}`);
//       console.log('Task deleted successfully');
//     } catch (error) {
//       console.error('Error deleting task:', error);
//       throw error;
//     }
//   },
// };

// export default TaskService;