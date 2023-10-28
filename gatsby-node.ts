import path from "path";
import readingTime from "reading-time";
import type { GatsbyNode } from "gatsby"
import * as _ from "lodash";

import { CreatePageQueryData, MdxNode } from "./src/types/node-types";

import { slugifyFunc } from "./src/utils";

const blogPostTemplate = path.resolve(`src/templates/post-template/index.tsx`);

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql<CreatePageQueryData>(`
        query {
            allMdx {
                edges {
                    node {
                        id
                        frontmatter {
                            slug
                            title
                        } 
                        internal {
                            contentFilePath
                        }
                    }
                }
            }
        }
    `);

    if (result.errors || !result.data) {
        reporter.panicOnBuild(`*** ERROR loading MDX 'result': ***`, result.errors)
        return;
    }

    const { allMdx } = result.data


    reporter.info('*** GraphQL node query successful. Beginning createPages routine... ***')

    allMdx.edges.forEach((edge) => {
        const { node } = edge;
        createPage({
            path: `blog${node.frontmatter.slug}`,
            component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
            context: { slug: node.frontmatter.slug },
        })
    })


    reporter.info('*** createPages routine finished successfully ***')

}

