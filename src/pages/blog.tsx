import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import BlogListingComponent from "../components/blog-listing";
import "../styles/blog.scss"


export default function NavComponent(props: any): React.ReactComponentElement<any> {
    const postNodes = useStaticQuery(graphql`
        query { 
            allMdx {
                nodes {
                    frontmatter {
                        slug
                        date(formatString: "M-DD-YYYY")
                        description
                        title
                        tags {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `)
    const blogPosts = postNodes.allMdx.nodes;
    return (
        <>
            <section className="blog-section">
                <BlogListingComponent nodes={blogPosts} />
            </section>
        </>
    )
}
