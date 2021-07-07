/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios';
import config from '../../../config/general.config.js';


class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            showingProductSearchResult: false,
            productResult: false,
            productResultCount: false
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            showingProductSearchResult: false,
            productResult: false,
            productResultCount: false
        });
        if(this.state.showingSearch){
          document.getElementById("searchInput").value ='';
        }
    }
    /**
     * This function is intended to show the products section
     */
    showProductResultsSection(val, results = false, count = false){
        this.setState({
            showingSearch: !this.state.showingSearch,
            showingProductSearchResult: val,
            productResult: results,
            productResultCount: count
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        
        // Start Here
        e.preventDefault();
        //we set the config variables of API
        var server = config;
        //set variable to be able to access this object in promise
        var that = this;
        that.showProductResultsSection(false);
        axios.get(server.dev_server_url + server.dev_server_port + '/products?name='+e.target.value).then(function (response) {
          console.log(response);
          //show and populate products bar
          that.showProductResultsSection(true, response.data.result, response.data.count);
          document.getElementById("searchInput").focus();
        })
        .catch(function (error) {
          console.log(error);
          that.showProductResultsSection(false);
        })
        

    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input id="searchInput" type="text" onKeyUp={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <span className="results" style={{display: this.state.showingProductSearchResult ? 'block' : 'none' }}>{"Displaying "+(this.state.productResult ? this.state.productResult.length : '0') +"of "+(this.state.productResultCount ? this.state.productResultCount : '0') + " results."}</span>
                    <div id="container" style={{display: this.state.showingProductSearchResult ? 'block' : 'none' }}>
                      <div id="inner">
                      {(this.state.productResult) ? this.state.productResult.map((val, key) =>{
                          return(
                            <div className="child row" key={val._id}>
                              <div className="column">
                                <img src={val.picture} width="100" height="200"/>
                              </div>
                              <div className="column">
                                <div className="product-title">{val.name}</div>
                                <div>{val.tags.map((val2, key2) => {return(<span key={key2}>{val2}<br /></span>);})}</div>
                              </div>
                            </div>
                          );
                        }) : ""}
                      </div>
                    </div>
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;