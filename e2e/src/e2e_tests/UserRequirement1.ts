//webdriver-manager update   
//webdriver-manager start
//protractor .\protractor.conf.js  

import { browser, by, WebElement } from "protractor";

//Code adaapted from the java e2e test file
describe('Testing the adding of a new category and item.', 
            function(){
                it('Testing the creation of a new category.', 
                    function() {
                        let textToFind = "Protractor test category";
                        let protractor_test_category_is_found = false;

                        browser.driver.get("http://localhost:4200");                        
    	                browser.driver.findElement(by.id("new_category_input_field")).sendKeys("Protractor test category");
                        browser.driver.findElement(by.id("add_category_button")).click();
                        //The category has been added. The display of the existing categories is being refreshed.
    	                browser.driver.get("http://localhost:4200");                                
                        let all_span_elements_Promise = browser.driver.findElements(by.tagName('span'));  

                        let all_span_elements:WebElement[];                                                               
                        all_span_elements_Promise.then(
                            data=>
                            {
                                all_span_elements = data;
                                console.log("**Retrieved all span elements. Number of elements found: "+all_span_elements.length);             
                                all_span_elements.forEach(
                                    element => {                                                                                                         
                                        let text:string;

                                        element.getText().then(
                                            data => {
                                                text=data;
                                                console.log("**Found text:"+text);
                                                if(text==textToFind){protractor_test_category_is_found=true;console.log("Found: "+textToFind+" Value of protractor_test_category_is_found:"+protractor_test_category_is_found);expect(protractor_test_category_is_found).toBe(true);}
                                            },
                                            error => {
                                                console.log("**error while getting the element's text", error);
                                            }
                                        );
                                    }
                                );
                            }
                           , 
                            error=>
                                {console.log("** 1. bis Error while retrieving all span elements:",error);}
                        );                           
                       
                        
                        
;
                    } 
                );
            });
