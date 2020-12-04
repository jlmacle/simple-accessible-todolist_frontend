import { browser, by, WebElement } from "protractor";

describe('Testing the adding of a new category and item.', 
            function(){
                it('Testing the adding of a new category.', 
                    function() {                        
                        browser.driver.get("http://localhost:4200");
                        browser.waitForAngular();
                        browser.driver.sleep(10000);
                        //attempt to avoid a stale elements issue
                        browser.navigate().refresh();
                        browser.driver.findElement(by.id("new_category_input_field")).sendKeys("Protractor test category");
                        browser.driver.findElement(by.id("add_category_button")).click();                        
                                               
                        
                        let all_span_elements_Promise = browser.driver.findElements(by.tagName('span'));  
                        
                                               
                        let all_span_elements:WebElement[];
                        let protractor_test_category_is_found = false;    
                        console.log("**  Before accessing the elements of the promise.");                                    
                        all_span_elements_Promise.then(
                            data=>
                            {                                
                                all_span_elements = data;
                                console.log("** 1. Retrieved all span elements. Number of elements found: "+all_span_elements.length);             
                                all_span_elements.forEach(
                                    element => 
                                    {
                                        browser.driver.wait(element.isDisplayed());
                                        let text:string

                                        element.getText().then(
                                            text_data => {
                                                text=text_data;
                                                console.log("**  1. Found text:"+text);
                                            },
                                            error => {
                                                console.log("**  1. error while getting the element's text", error);
                                            }                            
                                        );     
                                    });
                             },                                      
                             
                            error=>
                                {console.log("** 1. bis Error while retrieving all span elements:",error);}
                        );                               
                        browser.driver.quit();
                        expect(protractor_test_category_is_found).toBe(true);
                        
                    } 
                );
            });
