
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import InfoPanel from "@/components/InfoPanel";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState("1");

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left sidebar with chat list */}
      <Sidebar 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />
      
      {/* Main content with chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b flex items-center justify-between px-4 bg-white">
          <div className="flex items-center gap-4">
            <button className="py-2 px-4 bg-estate-dark-gray text-white rounded-md text-sm font-medium">
              Chat
            </button>
            <button className="py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium">
              Contactos
            </button>
            <button className="py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium">
              Plantillas
            </button>
            <button className="py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium">
              Mis Propiedades
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?img=8" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="font-medium">Pedro Agente</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <ChatWindow selectedContactId={selectedContact} />
          <InfoPanel selectedContactId={selectedContact} />
        </div>
      </div>
    </div>
  );
};

export default Index;
