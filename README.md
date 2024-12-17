<h1 align="center"> Food Product Explorer</h1>

<div align="center">
  
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Visual Studio](https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white)
[![JavaScript](https://img.shields.io/badge/javascript-ECMAScript_2022-brightgreen.svg?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/)
[![React](https://img.shields.io/badge/react-16.13.1-blue.svg?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Axios](https://img.shields.io/badge/Axios-0.29.2-blue.svg?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)


</div>

Food Product Explorer is a web application that provides a user-friendly interface to search, filter, and view details of food products using the OpenFoodFacts API.


<h3>Features</h3>
 
- **Search**: Find food products by name, category, or barcode.
- **Product Details**: View detailed information, including ingredients, nutritional facts, and images.
- **Filters and Sorting**: Filter search results by category and sort by product name or nutritional grade.
- **Pagination**: Load more products seamlessly.



## Getting Started
Follow these steps to set up and run the project on your local machine.

### Prerequisites
Ensure you have the following installed:
- Window 10
- [python 3](https://www.python.org/)
- [Visual Studio](https://visualstudio.microsoft.com/downloads/)
- [Node.js](https://nodejs.org/)

### Dependencies
The project uses the following libraries and frameworks:
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
  

## Installation

1. Clone the Repository:
<div>
<pre style="font-size: 1.2em;">
git clone https://github.com/<your-username>/<your-repository-name>.git
  
</pre>
</div>

2. Install Dependencies:

<div>
<pre style="font-size: 1.2em;">
cd your-repository-name
npm install
</pre>
</div>

## Running the Application:
<div>
<pre style="font-size: 1.2em;">
  
npm start
</pre>
</div>

This will start a development server and open your default browser to http://localhost:3000.

## Project Structure
- FoodApiServices.js: Handles API calls to OpenFoodFacts.
- FoodSearch.js: Component for searching and listing products.
- ProductDetail.js: Component for viewing detailed product information.
- style.css: Stylesheet for the application.
  
## API Endpoints
This application uses the OpenFoodFacts API to fetch product data:

- Product Search: /cgi/search.pl
- Category Search: /category/<category>.json
- Product Details: /api/v0/product/<barcode>.json
- Category List: /categories.json
  
## Usage
### Search Products:

- By name: Type a product name in the search bar.
- By barcode: Enter the product's barcode.
- By category: Select a category from the dropdown.
  
### Filter and Sort:

- Sort products alphabetically or by nutritional grade using dropdowns.
- Use the "Load More" button to view additional products.

### View Details:

- Click on a product to view detailed information.

## Acknowledgments
* OpenFoodFacts for their API and data.
* React and Axios for powering the frontend.
