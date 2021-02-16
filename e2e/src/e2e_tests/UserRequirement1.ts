//ng e2e 
 
import { fail } from "assert";
import { browser, by} from "protractor";

//Code adapted from the java e2e test file
describe('Testing the addition and deletion of a new category.', 
            function(){
                it('Testing the creation of a new category.', 
                    async function() {
                        let textToFind:string = "Protractor test category";
                        let protractor_test_category_is_found:boolean = false;

                        console.log("1. Creation of a category");
                        browser.driver.get("http://localhost:4200");                        
    	                browser.driver.findElement(by.id("new_category_input_field")).sendKeys("Protractor test category");
                        browser.driver.findElement(by.id("add_category_button")).click();
                        console.log("**At this point, the test category should have been created.");
                        //The category has been added. The display of the existing categories is being refreshed.
    	                browser.driver.get("http://localhost:4200");                                
                        let aCategory_elements_Promise = browser.driver.findElements(by.name('aCategory')); 
                        
                        await aCategory_elements_Promise.then(
                            aCategory_elements=>
                            {
                                console.log("2. Confirmation that the category was created.")
                                console.log("**Retrieved all aCategory elements. Number of elements found: "+aCategory_elements.length);        
                                if(aCategory_elements.length==0){fail("No categories were found. There should be at leat 'Uncategorized'. The app wasn't started.");}
                                aCategory_elements.forEach(
                                    element => {                                                                                                         
                                        let text:string;

                                        element.getText().then(
                                            text_data => {
                                                text=text_data.trim();//trimming the space before the text
                                                console.log("**Found text:"+text);
                                                if(text==textToFind){
                                                    protractor_test_category_is_found=true;                                                   
                                                    expect(protractor_test_category_is_found).toBe(true);}
                                            },
                                            error => {
                                                console.log("**Error while getting the aCategory element's text: ", error);
                                            }
                                        );
                                    }
                                );
                            }
                           , 
                            error=>
                                {console.log("**Error while retrieving all aCategory elements:",error);}
                        ); 
                        expect(protractor_test_category_is_found).toBe(true);
                        
                    } 
                );
                it('Testing the deletion of the new category',
                    async function(){
                        console.log("1. Deletion of a category");
                        let testCategoryPositionInTheList:number = 0;
                        let currentCategoryPosition:number = 0;                        
                        let textToFind:string = "Protractor test category";
                        let isCategoryDeleted:boolean=false;

                        		
		                //1. Confirmation that the category was created; registration of its position in the list of elements named aCategory    	
                        browser.driver.get("http://localhost:4200"); 
                        let aCategoryElements_Promise= browser.driver.findElements(by.name("aCategory"));	
                        await aCategoryElements_Promise.then(
                            aCategoryElements=>{                                
                                console.log("**Retrieved all elements named aCategory. Number of elements found: "+aCategoryElements.length);                                
                                if(aCategoryElements.length==0){fail("No categories were found. There should be at leat 'Uncategorized'. The app wasn't started.");}
                                //Finding the position of the test category
                                let foundPositionTestCategory:boolean=false;
                                for(let i=0; i<aCategoryElements.length; i++)
                                {

                                    aCategoryElements[i].getText().then(
                                        text=>
                                        {
                                            let trimmed_text = text.trim();
                                            currentCategoryPosition++;
                                            console.log("Text: "+trimmed_text+" in position: "+currentCategoryPosition);
                                            if(trimmed_text==textToFind)
                                            {
                                                this.testCategoryPositionInTheList = currentCategoryPosition;
                                                foundPositionTestCategory=true;
                                            }
                                        }
                                        ,
                                        error=>{console.log("Error while retrieving the text of a category to locate its position: ",error);}
                                    );
                                    if (foundPositionTestCategory) {
                                        console.log("Exiting the first for loop");
                                        break;
                                    }
                                }
                                // clicking the trash can icon at the right position
                                console.log("Finding the element to click on.");
                                let categoryClickedForDeletion:boolean=false;
                                currentCategoryPosition=0;
                                browser.driver.findElements(by.name("anIconToDeleteACategory")).then(
                                    anIconToDeleteACategoryElements => 
                                    {
                                        for(let k=0;k<anIconToDeleteACategoryElements.length;k++)
                                        {
                                            currentCategoryPosition++;
                                            if(currentCategoryPosition==this.testCategoryPositionInTheList)
                                            {
                                                console.log("Click on the element in position: ",currentCategoryPosition);
                                                anIconToDeleteACategoryElements[k].click();
                                                categoryClickedForDeletion=true;
                                            }
                                            console.log("categoryClickedForDeletion: "+categoryClickedForDeletion);
                                            if(categoryClickedForDeletion) break;                                            
                                        }
                                    },
                                    error =>
                                    {
                                        console.log("Error while retrieving the elements named anIconToDeleteACategory: ", error);
                                    }

                                );

                                //Verifying the deletion
                                browser.driver.get("http://localhost:4200");
                                browser.driver.findElements(by.name("aCategory")).then(
                                    aCategoryElements =>
                                    {
                                        aCategoryElements.forEach(
                                            aCategoryElement => 
                                            {
                                                aCategoryElement.getText().then(
                                                    text => 
                                                    {
                                                        if(text.trim()==this.textToFind) 
                                                            fail("Found "+text.trim()+" as category. The test of deletion is failed.");
                                                        else this.isCategoryDeleted=true;
                                                    },
                                                    error =>
                                                    {console.log("Error while retrieving the text from the element named aCategory: ",error);}
                                                );
                                            }
                                        );
                                        expect(this.isCategoryDeleted).toBe(true);   
                                    }
                                );
                                
							}
                        );   
                                
                    }
                );
            }   
);
