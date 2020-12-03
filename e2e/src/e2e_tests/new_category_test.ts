import { browser, by, WebElement } from "protractor";

describe('Testing the adding of a new category and item.', 
            function(){
                it('Testing the adding of a new category.', 
                    function() {
                        browser.driver.get("http://localhost:4200");
                        browser.driver.findElement(by.id("new_category_input_field")).sendKeys("Protractor test category");
                        browser.driver.findElement(by.id("add_category_button")).click();
                        
                        // Checking if the corresponding HTML element can be find in the DOM
                        // TODO: find the element associated to the category "Protractor test category".
                        
                        //TODO: how to elegantly solve the wait issue
                        let all_span_elements_Promise = browser.driver.findElements(by.tagName('span'));  
                        // code experiment from information gathered
                        // browser.wait.until(ExpectedConditions.visibilityOf(by.xpath("//div[contains(text(),'Protractor test category')]"))); 
                          
                       
                        
                        //TODO: to remove when code finished
                        // from https://www.selenium.dev/documentation/en/guidelines_and_recommendations/page_object_models/
                        // verify h1 tag is "Hello userName" after login
                        //browser.driver.findElement(by.tagName("h1")).isDisplayed();
                        //let the_element = browser.driver.findElement(by.xpath("//li[contains(text()]",'Protractor test category'));


                        let all_span_elements:WebElement[];
                        let protractor_test_category_is_found = false;                                        
                        all_span_elements_Promise.then(
                            data=>
                            {
                                all_span_elements = data;
                                console.log("** 1. Retrieved all span elements. Number of elements found: "+all_span_elements.length);             
                                all_span_elements.forEach(
                                    element => 
                                    {
                                        let id:string;
                                        //TODO: clean up code when information identification is successful 
                                        let text:string
                                        let cssValue_id:string;
                                        let cssValue_value:string;

                                        element.getText().then(
                                            data => {
                                                text=data;
                                                console.log("**  1. Found text:"+text);
                                            },
                                            error => {
                                                console.log("**  1. error while getting the element's text", error);
                                            }                            
                                        );
                                        
                                        /*
                                        element.getId().then(
                                            data => {
                                                id=data; 
                                                console.log("** 2. Found id:"+id); 
                                                if(id.includes("Protractor test category"))
                                                    {protractor_test_category_is_found = true;}  
                                            },
                                            error => {console.info("** 2. bis Error while getting the id:",error);}
                                        );*/                                       
                                        
                                        /*
                                        element.getCssValue("id").then(
                                            data => {
                                                cssValue_id=data;
                                                console.log("** Extra: Found CssValue('id'):"+cssValue_id);
                                            },
                                            error => {
                                                console.log("** Extra bis: error while getting the element's cssValue_id", error);
                                            }                            
                                        );

                                        element.getCssValue("value").then(
                                            data => {
                                                cssValue_value=data;
                                                console.log("** Extra: Found CssValue('value'):"+cssValue_value);
                                            },
                                            error => {
                                                console.log("** Extra bis: error while getting the element's cssValue_value", error);
                                            }                            
                                        );*/
                                    });
                             },                                      
                             
                            error=>
                                {console.log("** 1. bis Error while retrieving all span elements:",error);}
                        );            
                      
                        browser.driver.sleep(25000);
                        //expect(protractor_test_category_is_found).toBe(true);
                        
;
                    } 
                );
            });
