import { browser, by, WebElement } from "protractor";

describe('Testing the user requirement 3 of hiding/displaying an item',
    function(){
        it('Testing the hiding/displaying of an item',
            function(){
                let testLabelItem:string="Protractor test item";
                let isItemDisplayed:boolean=false;
                console.log("1. Creation of an item");
                browser.driver.get("http://localhost:4200");
                browser.driver.findElement(by.id("category_to_select_field")).sendKeys("Misc.");
                browser.driver.findElement(by.id("item_input_name")).sendKeys(testLabelItem);
                browser.driver.findElement(by.id("add_item_button")).click();
                //to avoid a stale element issue
                browser.driver.get("http://localhost:4200");

                console.log("2. Testing that the item was created successfully");
                let anItemsElements_Promise = browser.driver.findElements(by.name("anItem"));
                anItemsElements_Promise.then(
                    anItemElements=>
                    {
                        anItemElements.forEach(
                            anItemElement => {
                                anItemElement.getText().then(
                                    text => {
                                        if(text==testLabelItem) {isItemDisplayed = true;console.log("Success. The test item label has been found: "+text)}
                                    },
                                    error =>{
                                        console.log("Error while retrieving the text of an element named anItem: ",error);
                                    }
                                );
                            }
                        )
                    },
                    error=>{console.log("Error while accessing the data related to the elements named anItem",error)}                    
                    );
                
                console.log("3. Testing that the created item is displayed and not hidded.")
                //To finish


            })
    })