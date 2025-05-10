
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Users, 
  UserCheck, 
  MessageCircle, 
  X, 
  Trash2, 
  UserMinus,
  Inbox
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  count?: number;
  isPro?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon, label, isActive, count, isPro, onClick }: SidebarItemProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 text-sm text-left",
        isActive 
          ? "bg-estate-purple/10 border-l-4 border-estate-purple text-white" 
          : "text-gray-400 hover:bg-estate-purple/5"
      )}
      onClick={onClick}
    >
      <span className="text-estate-purple">{icon}</span>
      <span>{label}</span>
      {count !== undefined && count > 0 && (
        <Badge variant="outline" className="ml-auto bg-estate-purple/20 text-xs">
          {count}
        </Badge>
      )}
      {isPro && (
        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-estate-purple text-white">
          PRO
        </span>
      )}
    </button>
  );
};

type ContactProps = {
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
  isSelected: boolean;
  phoneNumber: string;
  status?: "typing" | "responded" | "unread";
  onClick: () => void;
};

const Contact = ({
  avatar,
  name,
  lastMessage,
  time,
  isSelected,
  phoneNumber,
  status,
  onClick
}: ContactProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 border-b border-zinc-800 cursor-pointer hover:bg-zinc-800/50",
        isSelected && "bg-zinc-800"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm text-white truncate">{name}</p>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">+{phoneNumber}</span>
        </div>
        <p className="text-sm text-gray-400 truncate mt-1">
          {status === "typing" ? (
            <span className="text-estate-purple">Typing...</span>
          ) : (
            lastMessage
          )}
        </p>
      </div>
    </div>
  );
};

type SidebarProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  selectedContact: string;
  setSelectedContact: (id: string) => void;
};

const Sidebar = ({ activeFilter, setActiveFilter, selectedContact, setSelectedContact }: SidebarProps) => {
  const filters = [
    { id: "all", label: "All", icon: <Inbox size={20} />, count: 12 },
    { id: "assignedToMe", label: "Assigned to Me", icon: <UserCheck size={20} />, count: 6 },
    { id: "unassigned", label: "Unassigned", icon: <UserMinus size={20} />, count: 3 },
    { id: "liveChat", label: "Live Chat", icon: <MessageCircle size={20} />, count: 2 },
    { id: "blocked", label: "Blocked", icon: <X size={20} />, count: 0, isPro: true },
    { id: "trash", label: "Trash", icon: <Trash2 size={20} />, count: 0 },
  ];

  const contacts = [
    {
      id: "1",
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "Miguel Sánchez",
      phoneNumber: "34 654-789-123",
      lastMessage: "Hello! I am looking for a new property...",
      time: "12:38",
      status: "unread" as const,
    },
    {
      id: "2",
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Laura González",
      phoneNumber: "34 654-543-321",
      lastMessage: "Typing...",
      time: "12:34",
      status: "typing" as const,
    },
    {
      id: "3",
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Carlos Rodríguez",
      phoneNumber: "34 654-543-432",
      lastMessage: "It works for me! Thanks",
      time: "12:28",
      status: "responded" as const,
    },
    {
      id: "4",
      avatar: "https://i.pravatar.cc/150?img=4",
      name: "María Veltrova",
      phoneNumber: "34 654-543-567",
      lastMessage: "Let's stay in touch!",
      time: "12:26",
      status: "unread" as const,
    },
    {
      id: "5",
      avatar: "https://i.pravatar.cc/150?img=5",
      name: "Francisco López",
      phoneNumber: "34 654-542-123",
      lastMessage: "Thanks. I will watch it later...",
      time: "12:20",
      status: "responded" as const,
    },
    {
      id: "6",
      avatar: "https://i.pravatar.cc/150?img=6",
      name: "Omar Petrovski",
      phoneNumber: "34 654-541-234",
      lastMessage: "Voice message",
      time: "12:05",
      status: "unread" as const,
    },
    {
      id: "7",
      avatar: "https://i.pravatar.cc/150?img=7",
      name: "Marcus Bergson",
      phoneNumber: "34 654-540-345",
      lastMessage: "Hello! I am looking for a new property...",
      time: "11:58",
      status: "unread" as const,
    },
  ];

  // Search functionality
  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="h-screen flex flex-col bg-estate-dark-gray w-80 flex-shrink-0 overflow-hidden">
      <div className="flex items-center h-16 px-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="bg-estate-purple rounded p-1">
            <Users className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-white">EstateChatFlow</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="py-2 border-b border-zinc-800">
        {filters.map((filter) => (
          <SidebarItem
            key={filter.id}
            icon={filter.icon}
            label={filter.label}
            isActive={activeFilter === filter.id}
            count={filter.count}
            isPro={filter.isPro}
            onClick={() => setActiveFilter(filter.id)}
          />
        ))}
      </div>

      {/* Search */}
      <div className="p-3 border-b border-zinc-800">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-zinc-800 text-white rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-estate-purple"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
        {filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            avatar={contact.avatar}
            name={contact.name}
            lastMessage={contact.lastMessage}
            time={contact.time}
            isSelected={selectedContact === contact.id}
            phoneNumber={contact.phoneNumber}
            status={contact.status}
            onClick={() => setSelectedContact(contact.id)}
          />
        ))}
      </div>

      {/* Pro Plan */}
      <div className="mt-auto p-4 bg-zinc-900 border-t border-zinc-800">
        <div className="rounded-md bg-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-estate-purple font-semibold">Pro Plan</h3>
            <span className="text-white font-bold">€49<span className="text-sm font-normal text-gray-400">/month</span></span>
          </div>
          <p className="text-xs text-gray-400 mb-3">Unlock premium features for your real estate business</p>
          <button className="w-full bg-estate-purple text-white py-2 rounded-md text-sm font-medium">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
