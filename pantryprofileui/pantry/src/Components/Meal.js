import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom"; // Import BrowserRouter and Link
import logo from './image/Logo_3.png';
import ImageRecognition from "./ImageRecognition";

const Meal = () => {
    const [search, setSearch] = useState("");
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [groceryList, setGroceryList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetchRandomRecipes();
    }, []);

    const fetchRandomRecipes = () => {
        const fetchPromises = [];
    
        // getting 5 different random recipes
        for (let i = 0; i < 5; i++) {
            fetchPromises.push(fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()));
        }
    
        Promise.all(fetchPromises)
            .then(data => {
                const randomRecipes = data.map(response => response.meals && response.meals[0]).filter(recipe => recipe); // Filter out null recipes
                setRandomRecipes(randomRecipes);
            })
            .catch(error => {
                console.error("Error fetching random recipes:", error);
            });
    };

    const searchMeal = (evt) => {
        if (evt.key === "Enter") {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
                .then(res => res.json())
                .then(data => {
                    setRandomRecipes(data.meals || []);
                    setSearch("");
                })
                .catch(error => {
                    console.error("Error searching for recipes:", error);
                });
        }
    };

    const addToGroceryList = (foodItem) => {
        setGroceryList([...groceryList, foodItem]);
    };

    const removeFromGroceryList = (index) => {
        const updatedList = [...groceryList];
        updatedList.splice(index, 1);
        setGroceryList(updatedList);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearch(value);

        // You can implement your own logic to fetch suggestions based on the value here
        // For simplicity, let's say suggestions are fetched from a local array
        const suggestions = ["Chicken", "Salad", "Pasta", "Soup"];
        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion);
        setSuggestions([]);
    };

    return (
        <div className="main">
            <div className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Kitchen Table Logo" className="navbar-logo" />
                    <h1 className="navbar-header">Kitchen Table</h1>
                </div>
                <div className="search-container">
                    <input
                        type="search"
                        className="search-bar"
                        placeholder="Search for something yummy!"
                        onChange={handleSearchChange}
                        value={search}
                        onKeyPress={searchMeal}
                    />
                    <ImageRecognition />
                </div>
                {/* Navigation Links */}
                <ul className="navbar-items">
                    <li><Link to="/">Home</Link></li> {/* Replace anchor tag with Link component */}
                    <li><Link to="/recipes">Recipes</Link></li> {/* Replace anchor tag with Link component */}
                    <li><Link to="/pantry">Pantry</Link></li> {/* Replace anchor tag with Link component */}
                    <li><Link to="/about">About</Link></li> {/* Replace anchor tag with Link component */}
                </ul>
            </div>
            <div className="container">
            </div>

            {/* Display Suggestions */}
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
                    ))}
                </ul>
            )}

            {/* Grocery list section */}
            <div className="grocery-list">
                <h2>Grocery List</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addToGroceryList(search);
                    setSearch("");
                }}>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Add food to grocery list"
                    />
                    <button type="submit">Add</button>
                </form>
                <ul>
                    {groceryList.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button onClick={() => removeFromGroceryList(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Random recipes */}
            <div className="random-recipes-banner">
                <h2>Start Here!</h2>
                <div className="recipe-cards">
                    {randomRecipes.map(recipe => (
                        <a href={recipe.strSource} target="_blank" rel="noopener noreferrer" key={recipe.idMeal}>
                            <div className="recipe-card">
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                <div className="recipe-details">
                                    <h3>{recipe.strMeal}</h3>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Meal;
