import Head from 'next/head';
import { useRouter } from 'next/router';
import profile from '@src/constants/profile';
export default function CustomHead({title='Aayaann Kausar — AI Engineer & Researcher',description='AI agents, speech systems, and LLM research by Aayaann Kausar, IIT Kharagpur.',keywords=[]}) {
 const router=useRouter(); const origin=process.env.NEXT_PUBLIC_SITE_URL;
 const schema={'@context':'https://schema.org','@type':'Person',name:profile.person.name,jobTitle:'AI Engineer & Independent Researcher',email:profile.person.email,sameAs:[profile.person.github,profile.person.linkedin],affiliation:{'@type':'CollegeOrUniversity',name:profile.person.education.institution}};
 return <Head><title>{title}</title><meta name="description" content={description}/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="author" content={profile.person.name}/><meta name="keywords" content={keywords.join(', ')}/><meta name="theme-color" content="#28282b"/><meta name="robots" content={process.env.NODE_ENV==='development'?'noindex,nofollow':'index,follow'}/><link rel="icon" href="/icon.svg?v=ak-1"/>{origin&&<link rel="canonical" href={origin+router.asPath}/>}<meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:type" content="website"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></Head>;
}
