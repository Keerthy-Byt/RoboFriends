import { useEffect, useState } from "react";
import "./App.css";
import CardList from "./components/CardList";
import SearchBox from "./components/SearchBox";
import "tachyons";
import { robots as localRobots } from "./components/assets/robots";
import Scroll from "./components/Scroll";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //search functionality
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //fetching data for robots
  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch robots");
        }

        const data = await response.json();
        setRobots(data);
      } catch (error) {
        alert("Using Manual Data, Error fetching robots:", error);
        setRobots(localRobots);
      }
    };

    fetchRobots();
  }, []);
  //filter the robots to the value of the search term
  const filterRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox onSearchChange={handleSearchChange} />
      <Scroll>
        <CardList robots={filterRobots} />
      </Scroll>
    </div>
  );
}

export default App;
