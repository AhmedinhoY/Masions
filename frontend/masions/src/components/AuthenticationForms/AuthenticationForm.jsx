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
            Register
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            Log-in
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <RegisterForm />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <LoginForm />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
