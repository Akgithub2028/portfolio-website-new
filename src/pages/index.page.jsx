/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Quote from '@src/pages/components/quote/Index';
import Projects from '@src/pages/components/projects/Index';
import Clients from '@src/pages/components/clients/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {title:'Aayaann Kausar — AI Engineer & Researcher',description:"AI agents, speech systems, and research on LLM adaptation and continual learning. Independent work by Aayaann Kausar at IIT Kharagpur.",keywords:['Aayaann Kausar','AI Engineer','AI Researcher','IIT Kharagpur','LLM','LangGraph']};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <Home />
      <About />
      <Clients />
      <Quote />
      <Projects />
    </>
  );
}

export default Page;
