import Enzyme, {shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import LandingPage from "../components/LandingPage"

Enzyme.configure({adapter: new Adapter()});

describe('LandingPage',()=>{
    it("should have an title BON VOYAGE!",()=>{
        const wrapper = shallow(<LandingPage/>)
        const title = wrapper.find('div div h1')
        expect(title.text()).toBe("BON VOYAGE!")
    })
    it("should have a button Start", ()=>{
        const wrapper = shallow(<LandingPage/>)
        const button = wrapper.find('div Link button')
        expect(button.text()).toBe("Start")
    })

})