import { browser, by, WebElement } from "protractor";

describe('Testing the adding of a new category', 
            function(){
                it('A test of the suite', 
                    function() {
                        browser.driver.get("http://localhost:4200");
                        browser.driver.findElement(by.id("new_category_input_field")).sendKeys("Protractor test category");
                        browser.driver.findElement(by.id("add_category_button")).click();
                        browser.driver.sleep(5000);
                        // Checking if the corresponding HTML element can be find in the DOM
                        // TODO: find the id associated to the category "Protractor test category",
                        // in order to build the id used to find the HTML elements.
                        
                        let all_li_elements_Promise = browser.driver.findElements(by.tagName("li"));
                        let all_li_elements = [];
                        let protractor_test_category_is_found = false;

                        all_li_elements_Promise.then(
                            data=>{all_li_elements = data;},
                            error=>{console.log("Error while retrieving all li elements:",error);}
                        );
                        all_li_elements.forEach(
                            element => {
                                
                        });



                        browser.driver.sleep(5000);
                        
;
                    } 
                );
            });
