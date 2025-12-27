// Page Component Types
export interface PageMetadata {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    ogType?: 'website' | 'article'
    canonical?: string
    noIndex?: boolean
}

export interface PageProps<P = {}, L extends { children?: React.ReactNode } = { children?: React.ReactNode }> {
    component: React.ComponentType<P>
    layout?: React.ComponentType<L>
    layoutProps?: Omit<L, 'children'>
    metadata?: PageMetadata
} 