import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ExternalLink, Home, Search, User, Plus, FileText, Shield } from "lucide-react";
import SEOHelmet from '@/components/SEOHelmet';

interface SitemapSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: Array<{
    url: string;
    title: string;
    description: string;
    isExternal?: boolean;
  }>;
}

const SitemapPage = () => {
  const sitemapSections: SitemapSection[] = [
    {
      title: "Main Pages",
      description: "Core pages of the application",
      icon: <Home className="h-5 w-5" />,
      links: [
        {
          url: "/",
          title: "Home",
          description: "Welcome page with featured gems and latest content"
        },
        {
          url: "/browse",
          title: "Browse Gems",
          description: "Explore all available gems with filtering and search"
        }
      ]
    },
    {
      title: "User Account",
      description: "Account management and authentication",
      icon: <User className="h-5 w-5" />,
      links: [
        {
          url: "/login",
          title: "Login",
          description: "Sign in to your account"
        },
        {
          url: "/register",
          title: "Register",
          description: "Create a new account"
        },
        {
          url: "/edit-profile",
          title: "Edit Profile",
          description: "Update your profile information"
        }
      ]
    },
    {
      title: "Content Creation",
      description: "Create and manage content",
      icon: <Plus className="h-5 w-5" />,
      links: [
        {
          url: "/create",
          title: "Create Gem",
          description: "Share a new gem with the community"
        }
      ]
    },
    {
      title: "Legal & Information",
      description: "Terms, policies and information",
      icon: <Shield className="h-5 w-5" />,
      links: [
        {
          url: "/terms",
          title: "Terms of Service",
          description: "Terms and conditions for using the platform"
        },
        {
          url: "/privacy",
          title: "Privacy Policy",
          description: "How we handle your personal information"
        }
      ]
    },
    {
      title: "Technical",
      description: "Technical resources for developers and SEO",
      icon: <FileText className="h-5 w-5" />,
      links: [
        {
          url: "/sitemap.xml",
          title: "XML Sitemap",
          description: "Machine-readable sitemap for search engines",
          isExternal: true
        },
        {
          url: "/robots.txt",
          title: "Robots.txt",
          description: "Crawler directives and sitemap reference",
          isExternal: true
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SEOHelmet
        title="Sitemap | GemVoyage"
        description="Browse our comprehensive sitemap to easily navigate GemVoyage and discover all available pages for hidden gems, travel destinations, and community features."
        keywords="sitemap, site navigation, page directory, hidden gems platform structure"
        canonicalUrl={window.location.href}
        ogTitle="Sitemap | GemVoyage"
        ogDescription="Browse our comprehensive sitemap to easily navigate GemVoyage and discover all available pages for hidden gems and travel destinations."
        ogType="website"
        twitterTitle="Sitemap | GemVoyage"
        twitterDescription="Browse our comprehensive sitemap to easily navigate GemVoyage and discover all available pages for hidden gems and travel destinations."
      />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Site Map</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive overview of all pages and resources available on our platform.
          This sitemap helps users navigate our site and assists search engines in indexing our content.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {sitemapSections.map((section, index) => (
          <Card key={index} className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="border-l-2 border-primary/20 pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {link.isExternal ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:underline flex items-center gap-1"
                          >
                            {link.title}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <Link
                            to={link.url}
                            className="font-medium text-primary hover:underline"
                          >
                            {link.title}
                          </Link>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Search className="h-5 w-5" />
          For Search Engines
        </h2>
        <p className="text-muted-foreground mb-4">
          This website provides structured sitemaps for search engines and web crawlers:
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              XML Sitemap
            </a>
          </Badge>
          <Badge variant="secondary">
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
              Robots.txt
            </a>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
