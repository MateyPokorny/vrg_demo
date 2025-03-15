"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

interface TabSwitchProps {
  tabs: { title: string; content: string }[];
}

const TabSwitch: React.FC<TabSwitchProps> = ({ tabs }) => {
  return (
    <TabGroup className="w-full bg-gray-800 ring shadow-xl ring-gray-900/5">
      <TabList className="flex">
        {tabs.map((tab, index) => (
          <Tab key={index} className="data-[selected]:bg-blue-500 font-medium bg-zinc-600 p-3 w-1/3 focus:outline-none">
            {tab.title}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="p-2 mt-2">
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default TabSwitch;