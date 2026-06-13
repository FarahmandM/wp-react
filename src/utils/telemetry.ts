import { trace, context, Exception } from '@opentelemetry/api';
import { WpRestClient } from '@api/WpRestClient';
import { getConfig } from '@core/config';

const tracer = trace.getTracer('wp-react');

export async function instrumentedFetchPosts(params: Record<string, any>) {
    return tracer.startActiveSpan('fetchPosts', async (span) => {
        try {
            const client = new WpRestClient({ baseURL: getConfig().restUrl });
            const posts = await client.get('/wp/v2/posts', params);
            span.setStatus({ code: 1 }); // Ok
            return posts;
        } catch (error) {
            span.recordException(error as Exception);
            span.setStatus({ code: 2 }); // Error
            throw error;
        } finally {
            span.end();
        }
    });
}
