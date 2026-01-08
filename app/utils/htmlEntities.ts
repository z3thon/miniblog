/**
 * Decodes HTML entities in a string
 * Works in both server and client components
 * Common entities: &#39; (apostrophe), &#x27; (hex apostrophe), &amp; (ampersand), &quot; (quote), etc.
 */
export function decodeHtmlEntities(text: string): string {
  // #region agent log
  fetch('http://127.0.0.1:7258/ingest/448883cb-3096-4560-8b48-a3afafa1a8e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'htmlEntities.ts:7',message:'decodeHtmlEntities entry',data:{textType:typeof text,textValue:text?.substring(0,50),isNull:text===null,isUndefined:text===undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  if (!text || typeof text !== 'string') {
    // #region agent log
    fetch('http://127.0.0.1:7258/ingest/448883cb-3096-4560-8b48-a3afafa1a8e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'htmlEntities.ts:10',message:'decodeHtmlEntities early return',data:{textType:typeof text,textValue:text},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return text;
  }
  
  try {
    // First decode hex entities (&#x27;, &#x2F;, etc.) - must come before decimal
    let decoded = text.replace(/&#x([0-9a-fA-F]+);/gi, (match, hex) => {
      try {
        return String.fromCharCode(parseInt(hex, 16));
      } catch {
        return match; // Return original if parsing fails
      }
    });
    
    // Then decode numeric entities (&#39;, etc.)
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
      try {
        return String.fromCharCode(parseInt(dec, 10));
      } catch {
        return match; // Return original if parsing fails
      }
    });
    
    // Finally decode named entities (must come last to avoid double-decoding)
    decoded = decoded
      .replace(/&apos;/gi, "'")
      .replace(/&quot;/gi, '"')
      .replace(/&amp;/g, '&') // Must be last to avoid double-decoding
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ');
    
    // #region agent log
    fetch('http://127.0.0.1:7258/ingest/448883cb-3096-4560-8b48-a3afafa1a8e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'htmlEntities.ts:36',message:'decodeHtmlEntities success',data:{originalLength:text.length,decodedLength:decoded.length,decodedValue:decoded.substring(0,50)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    return decoded;
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7258/ingest/448883cb-3096-4560-8b48-a3afafa1a8e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'htmlEntities.ts:40',message:'decodeHtmlEntities error',data:{errorMessage:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    throw error;
  }
}

