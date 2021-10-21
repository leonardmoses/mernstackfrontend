import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
    // create state to hold about data
    const [ people, setPeople ] = useState(null);

    // create a var URL to be passed into when making API call
    const URL = "https://mernstackbackend.herokuapp.com/people";
  
    // create function to make api call
    const getPeople = async () => {
        // make api call and get response   
        const response = await fetch(URL);
        // turn response into javascript object
        const data = await response.json();
        // set the about state to the data
        setPeople(data);
    };
  
    //we need this function when we fill out a form. 
    const createPeople = async (person) => {
      // make post request to create people
      await fetch(URL, {
        method: "POST",
        //so that it knows it's json data
        headers: {
          "Content-Type": "Application/json",
        },
        //stringify will convert into json format
        body: JSON.stringify(person),
      });
      // update list of people
      getPeople();
    };

    // we need this function to update the data
    const updatePeople = async (person, id) => {
      // make put request to create people
      await fetch(URL + id, {
        method: "PUT",
        //so that it knows it's json data
        headers: {
          "Content-Type": "Application/json",
        },
        //stringify will convert into json format
        body: JSON.stringify(person),
      });
      // update list of people
      getPeople();
    }

    // we need this to delete a person
    const deletePeople = async id => {
      // make delete request to create people
      await fetch(URL + id, {
        method: "DELETE",
      })
      // update list of people
      getPeople();
    }

    // make an initial call for the data inside a useEffect, so it only happens once on component load. [] means run once. 
    useEffect(() => getPeople(), []);


    return (
        <main>
          <Switch>
            <Route exact path="/">
              <Index people={people} createPeople={createPeople} />
            </Route>
            <Route
              path="/people/:id"
              render={(rp) => (
                <Show
                people={people}
                updatePeople={updatePeople}
                deletePeople={deletePeople}
                {...rp}
              />
              )}
            />
          </Switch>
        </main>
      );
    }
    
    export default Main;