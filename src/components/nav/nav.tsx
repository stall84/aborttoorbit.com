import React, { ReactComponentElement } from 'react'
import { HeadFC, Link, PageProps } from "gatsby"
import "./nav.scss";

export default function NavComponent(props: any): ReactComponentElement<any> {

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/blog">BLOG</Link>
                </li>
                <li>
                    <Link to="/about">ABOUT</Link>
                </li>
            </ul>
        </nav>
    )
}