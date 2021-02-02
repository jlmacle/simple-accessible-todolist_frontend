import { browser, by } from "protractor";

describe('Testing the user requirement 2 of adding and deleting an item',
function(){
    let testItemLabel:string = "Protractor test item";    
    it("Testing the creation of an item",
        async function(){
            let isTheItemCreated:boolean=false;
            console.log("1. Creation of an item");
            browser.driver.get("http://localhost:4200");
            await browser.driver.findElement(by.id("category_to_select_field")).sendKeys("Misc.");
            await browser.driver.findElement(by.id("item_input_name")).sendKeys(testItemLabel);
            await browser.driver.findElement(by.id("add_item_button")).click();
            await browser.driver.get("http://localhost:4200");
            
            let anItemElements_Promise = browser.driver.findElements(by.name("anItem"));
            await anItemElements_Promise.then(
                anItemElements => {
                    anItemElements.forEach(anItemElement => 
                    {
                        anItemElement.getText().then(
                            text => {                                
                                if(text==testItemLabel){console.log("Test successful: *"+text+"* has been found.");isTheItemCreated=true;expect(isTheItemCreated).toBe(true);}
                            },
                            error => {
                                console.log("Error while retrieving the promise with the text of the element: ", error);
                            }
                        );
                    });
                    
                },
                error => {
                    console.log("Error while retrieving the promise with the anItem elements: ", error);
                }                
            );                
            if(isTheItemCreated == false) fail("No created item has been found. The test of creation failed.");   
                               
        });
        
    it("Testing the deletion of an item",
        async function(){
            let isTheItemDeleted:boolean=true;
            let positionOfTestItem:number=0;
            console.log("1. Finding the position of the item to delete");
            browser.driver.get("http://localhost:4200");
            let anItemElements_Promise = browser.driver.findElements(by.name("anItem"));
            anItemElements_Promise.then(
                anItemElements=>{
                    let elementPosition:number=0;
                    anItemElements.forEach(
                        anItemElement => {
                            elementPosition++;
                            anItemElement.getText().then(
                                text=>{if(text==testItemLabel){positionOfTestItem=elementPosition;
                                        console.log("Text found in the element named 'anItem': "+text+" in position: "+positionOfTestItem);}},
                                error=>{console.log("Error while retrieving the text of an element named 'anItem: ",error)}
                            )
                        },
                        error => {console.log("Error while going through the elements named 'anItem': ",error)}
                    );
                },
                error=>{console.log("Error while retrieving the elements named 'anItem':",error);});

            console.log("2. Clicking on the trash can icon to delete the element");
            await browser.driver.get("http://localhost:4200");
            let anIconToDeleteAnItemElements_Promise = browser.driver.findElements(by.name("anIconToDeleteAnItem"));
            await anIconToDeleteAnItemElements_Promise.then(                  
                async anIconToDeleteAnItemElements =>{                   
                    console.log("Found "+anIconToDeleteAnItemElements.length+" element(s) in anIconToDeleteAnItemElements");
                    if(anIconToDeleteAnItemElements.length==0){fail("There are no elements with a trash can icon. The test of deletion failed.");}           
                    let elementPosition = 0; 
                    anIconToDeleteAnItemElements.forEach(
                        async anIconToDeleteAnItemElement => {
                            
                            elementPosition++;
                            if(elementPosition==positionOfTestItem){
                                anIconToDeleteAnItemElement.click();
                                console.log("Element clicked for deletion in position: ",elementPosition);
                            }
                            else{console.log("Skipping this item trash can icon");}
                       
                        },
                        error => {
                            console.log("Error while going through the list of elements named anIconToDeleteAnItem: ", error);
                        }
                    );
                    console.log("3. Confirmation of deletion");
                    await browser.driver.get("http://localhost:4200");
                    anItemElements_Promise = browser.driver.findElements(by.name("anItem")); 
                    anItemElements_Promise.then(
                        anItemElements =>{
                            console.log("Found "+anItemElements.length+" element(s) named 'anItem'");
                            anItemElements.forEach(
                                anItemElement =>
                                {
                                    anItemElement.getText().then(
                                        text => {                         
                                            console.log("Deletion: Text has been found:*"+text+"*");                   
                                            if(text==testItemLabel){fail("The text *"+text+"* has been found. The test is failed.");}
                                        },
                                        error => {
                                            console.log("Error while retrieving the promise with the text of the element: ", error);
                                        }
                                    );
                                }
                            );                            
                        },
                        error => {
                            console.log("Error while retrieving the promise with the anItem elements: ", error);
                        }

                    ).catch(exception =>
                        {console.log("** Exception while retrieving the promise for the elements named anItem: "+exception);})

                },
                error => {
                    console.log("Error while retrieving the promise with the elements named anIconToDeleteAnItem: ",error);
                }

            );
            expect(isTheItemDeleted).toBe(true);
        });
        
} )