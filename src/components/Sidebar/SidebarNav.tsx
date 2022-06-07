import NavSection from "./NavSection";
import NavLink from "./NavLink";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { BsCollection } from "react-icons/bs";
import { VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function SidebarNav() {
  const { user, logout } = useContext(AuthContext);


  return (
    <VStack spacing="12" alignItems="flex-start">
      {user?.role.name === "ADMIN" && (
        <NavSection title={"GERAL"}>
          <NavLink href={"/dashboard"} icon={RiDashboardLine}>
            Dashboard
          </NavLink>
          <NavLink href={"/usuarios"} icon={RiContactsLine}>
            Usuários
          </NavLink>
        </NavSection>
      )}
      <NavSection title={"CHAT"}>
        <NavLink href={"/chat"} icon={BsCollection}>
          Chat
        </NavLink>
      </NavSection>
    </VStack>
  );
}
