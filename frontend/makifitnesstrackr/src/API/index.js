export const BASE_URL = "https://mkarijolich-fitness-tracker-backend.onrender.com"

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
}

export const fetchAllActivities = async () => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.activities;
  } catch (error) {
    console.log("An error occurred while fetching all activities.");
    throw error;
  }
};


export const fetchAllRoutines = async () => {
    // const token = getTokenFromLocalStorage();
  
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.routines;
    } catch (error) {
      console.log("An error occurred while fetching all routines.");
      throw error;
    }
  };


  export const register = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            timeout:8000,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username: username,
                    password: password
            })

        })
        const res = await response.json();
        return res

    } catch (error) {
        console.log("An error occurred while trying to register a new user.")
    }
}

export const login = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const res = await response.json();
        return res;
    }
    catch (error) {
        console.log("An error occurred while trying to login.")
        console.error()
    }
}



export const createNewActivity = async (name, description) => {
    const token = getTokenFromLocalStorage();

    try {
        const response = await fetch(`${BASE_URL}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                    name: name,
                    description: description
            })
        })
        return await response.json();

    } catch (error) {
        console.log("An error occurred while trying to create a new activity.")
        throw error
    }
}

export const createNewRoutine = async (creatorId, name, goal) => {
    const token = getTokenFromLocalStorage();

    console.log("CREATOR ID", creatorId);

    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                    creatorId: creatorId,
                    name: name,
                    goal: goal,
                    isPublic: false,
            })
        })
        return await response.json();

    } catch (error) {
        console.log("An error occurred while trying to create a new routine.")
        throw error
    }
}


export const getPublicRoutinesByActivity = async (activityId) => {

    try {
        const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        return data.routines;

    } catch (error) {
        console.log("An error occurred while trying to create a new routine.")
        throw error
    }
}

export const updateRoutine = async(routineId, name, goal, isPublic) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                    name: name,
                    goal: goal,
                    isPublic: isPublic
            })
        })
        return await response.json()

    } catch (error) {
        console.log("An error occurred while trying to edit a post.")
    }
}

export const createRoutineActivity = async (routineId, activityId, count, duration) => {
    const token = getTokenFromLocalStorage();

    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                activityId,
                count,
                duration
            })
        })
        return await response.json();

    } catch (error) {
        console.log("An error occurred while trying to create a new routine activity.")
        throw error
    }
}

export const updateRoutineActivity = async(id, count, duration) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                    count: count,
                    duration: duration
            })
        })
        return await response.json()

    } catch (error) {
        console.log("An error occurred while trying to update a RoutineActivity.");
        throw error;
    }
}

export const deleteRoutine = async (routineId) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
        })
        const result = await response.json()
       
        return result;
    } catch (error) {
        console.log("An error occurred while trying to delete a post.")
        throw error
    }
}

export const deleteRoutineActivity = async (id) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${BASE_URL}/routine_activities/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
        })
        const result = await response.json()
        return result;
    } catch (error) {
        console.log("An error occurred while trying to delete a routine activity.")
        throw error
    }
}

export const getMe = async () => {
    const token = getTokenFromLocalStorage();
  
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization':
                    `Bearer ${token}`
        },
      });
      const data = await response.json();
      console.log(data)
      return data.user;

    } catch (error) {
      console.log("An error occurred while fetching user data.");
      throw error;
    }
  };

export const fetchMyRoutines = async () => {
    const token = getTokenFromLocalStorage();
  
    try {
      const response = await fetch(`${BASE_URL}/users/me/routines`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization':
                    `Bearer ${token}`
        },
      });
      const data = await response.json();
      console.log(data)
      return data.routines;

    } catch (error) {
      console.log("An error occurred while fetching all routines.");
      throw error;
    }
  };