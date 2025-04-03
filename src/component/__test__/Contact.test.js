import { render ,screen} from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom";


// single test case
test('Contact component should render',()=>{
    render(<Contact/>)
    let heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();

})




// if want to group multiple test cases
describe('Test cases for contact us page',()=>{
    test('Contact component should find button on contact component.',()=>{
        render(<Contact/>)
        let button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    
    })
    
    test('Contact component should find text submit on contact component.',()=>{
        render(<Contact/>)
        let button = screen.getByText('Submit');
        expect(button).toBeInTheDocument();
    
    })
    
    //instead of test() , we can also write it(), both are same thing
    it('Contact component should find textarea on contact component.',()=>{
        render(<Contact/>)
        //querying
        let input = screen.getAllByRole('textbox');
        //Assert
        expect(input.length).toBe(3);
    
    })
})

