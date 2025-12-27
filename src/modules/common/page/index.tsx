import Head from 'next/head'
import React, { ReactNode } from 'react'
import { PageProps } from '@modules/common/types'

const DEFAULT_TITLE = 'Zephyr'
const DEFAULT_DESCRIPTION = 'A Collaborative project management web tool'

const Page = <P extends object, L extends { children?: React.ReactNode } = { children?: React.ReactNode }>({ component: Component, layout: Layout, layoutProps, metadata = {}, ...props }: PageProps<P, L> & P) => {
    const {
        title,
        description = DEFAULT_DESCRIPTION,
        keywords = [],
        ogImage,
        ogType = 'website',
        canonical,
        noIndex = false
    } = metadata

    const formattedTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE

    return (
        <>
            <Head>
                <title>{formattedTitle}</title>
                <meta name="description" content={description} />

                {/* Keywords */}
                {keywords.length > 0 && (
                    <meta name="keywords" content={keywords.join(', ')} />
                )}

                {/* Open Graph / Social Media */}
                <meta property="og:title" content={formattedTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content={ogType} />
                {ogImage && <meta property="og:image" content={ogImage} />}

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={formattedTitle} />
                <meta name="twitter:description" content={description} />
                {ogImage && <meta name="twitter:image" content={ogImage} />}

                {/* Canonical URL */}
                {canonical && <link rel="canonical" href={canonical} />}

                {/* Robots */}
                {noIndex && <meta name="robots" content="noindex, nofollow" />}

                {/* Viewport */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {Layout ? (
                <Layout {...(layoutProps as L)}>
                    <Component {...props as P} />
                </Layout>
            ) : (
                <Component {...props as P} />
            )}
        </>
    )
}

export default Page
