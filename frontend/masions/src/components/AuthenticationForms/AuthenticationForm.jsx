import * as Tabs from "@radix-ui/react-tabs";
import "./AuthenticationForm.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthenticationForm() {
  return (
    <div>
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList" aria-label="Manage your account">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Log-in
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            Register
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <LoginForm />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <RegisterForm />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
