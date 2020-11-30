import { browser, by } from "protractor";

describe('Testing the adding of a new category', 
            function(){
                it('A test of the suite', 
                    function() {
                        browser.driver.get("http://localhost:4200");
                        browser.driver.findElement(by.id("new_category_input_field")).sendKeys("Protractor test category");
                        //Checking if the corecponding HTML element can be find in the DOM
                        let protractor_category = browser.driver.findElement(by.id());
;
                    } 
                );
            });
