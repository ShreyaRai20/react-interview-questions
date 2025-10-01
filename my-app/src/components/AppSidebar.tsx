

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"



const items = [
  {
    title: "cinema-seat-booking",
    url: 'cinema-seat-booking',
  },
  {
    title: "file-explorer",
    url: "file-explorer",

  },
  {
    title: "pagination",
    url: "pagination",
  
  },
  {
    title: "memory-game",
    url: "memory-game",
    
  },
  {
    title: "progress-bar",
    url: "progress-bar",
  
  },
  {
    title: "grid-lights",
    url: "grid-lights",

  },

  {
    title: "tic-tac-toe",
    url: "tic-tac-toe",

  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}