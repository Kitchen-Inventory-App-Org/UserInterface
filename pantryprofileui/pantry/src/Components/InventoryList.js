import React, { useState } from 'react';
import InvTest from 'InvTest.js';


function InventoryList() {

    const [foods, setFoods] = useState([]);

    function handleAddFood(){
        const newFood = document.getElementById("foodInput").value;
        document.getElementById("foodInput").value = "";

        setFoods(f =>[...f, newFood]);

    }

    function handleRemoveFood(index){
        
        setFoods(foods.filter((_, i) => i !== index));

    }

    const searchInventory = async (evt) => {
        if (evt.key === "Enter") {
            try {
                const response = await fetch(`http://localhost:8080/showInventory`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error searching for recipes:", error);
                return null; // or handle error in a different way
            }
        }
    };

    return (
        <div className="inventory-list">
            <h2>Inventory List</h2>
            <ul>
                {foods.map((food, index) => (
                    <li key={index}>
                        <span className="text">{food}</span>
                        <button
                            className="delete-button"
                            onClick={() => handleRemoveFood(index)}>
                            delete
                        </button>
                    </li>
                ))}
            </ul>
            <input type="text" id="foodInput" placeholder="Enter Inventory Here" onKeyPress={searchInventory} />
            <button onClick={handleAddFood}>Add Inventory</button>
            <div>
                <h2>Search Results</h2>
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default InventoryList;