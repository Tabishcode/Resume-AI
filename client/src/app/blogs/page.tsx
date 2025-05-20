'use client'
import React, { useEffect, useState } from 'react';

const Page = () => {
    interface Article {
        source: {
            name: string;
        };
        author: string;
        title: string;
        description: string;
        url: string;
        urlToImage: string;
        publishedAt: string;
        content: string;
    }
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
      
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    'https://newsapi.org/v2/everything?q=resume%20parsing%20OR%20human%20resource%20management&from=2024-11-22&sortBy=publishedAt&apiKey=a91c73095fb0436bb0d61a04f60f0742'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticles(data.articles.slice(0, 20)); // Limit to 20 articles
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold text-center mb-8">Latest News</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200"
                    >
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                            <p className="text-sm text-gray-500 mb-4">
                                {new Date(article.publishedAt).toLocaleDateString()} |{' '}
                                {article.source.name}
                            </p>
                            <p className="text-gray-700 line-clamp-3">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline mt-4 inline-block"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
