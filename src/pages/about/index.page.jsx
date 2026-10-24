/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import Toolkit from '@src/pages/about/components/toolkit/Toolkit';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {title:'Aayaann Kausar — About',description:"AI engineering and independent research by Aayaann Kausar: multi-agent systems, LLM fine-tuning, multilingual speech, and sequence modelling.",keywords:['Aayaann Kausar','IIT Kharagpur','AI engineering','Independent research']};
function Page() {
  return (
    <>
      <CustomHead {...seo} />

      <Hero />
      <Overview />
      <Services />
      <Toolkit />
      <Process />
    </>
  );
}

export default Page;
