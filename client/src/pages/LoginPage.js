import Body from "../components/Body";
import {
    Input,
    Button,
    Typography
} from '@material-tailwind/react';

export default function LoginPage() {
    return (
        <Body>
            <div className="flex flex-col mx-auto justify-center items-center h-[50vh] w-80">
                <div className="mb-4 w-full">
                    <Input label="Username"/>
                </div>
                <div className="mb-4 w-full">
                    <Input label="Password"/>
                </div>
                <Button className="mb-4 w-full">Sign In</Button>
                <a className="text-center text-md font-thin text-gray-700 mb-2">Forgot password?</a>
                <div className="flex items-center justify-center mb-4 pt-2 border-t-2 border-t-gray-300 w-full">
                    <p>Don't have an account?</p>
                    <Button className="ml-4 p-2 pl-3 pr-3">Register</Button>
                </div>
            </div>
        </Body>
    );
}