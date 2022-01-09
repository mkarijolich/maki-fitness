export const BASE_URL = "http://localhost:3000/api";
export const COHORT_NAME = "2108-UIC-RM-WEB-PT";
export const API_URL = BASE_URL + "/" + COHORT_NAME;

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
        return res.token;

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
        return res.token;
    }
    catch (error) {
        console.log("An error occurred while trying to login.")
        throw error;
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

export const createNewRoutine = async (name, goal) => {
    const token = getTokenFromLocalStorage();

    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                    name: name,
                    goal: goal
            })
        })
        return await response.json();

    } catch (error) {
        console.log("An error occurred while trying to create a new routine.")
        throw error
    }
}

