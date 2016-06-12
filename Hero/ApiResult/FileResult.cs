using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Hero
{
    public class FileResult : IHttpActionResult
    {
        private string filePath;
        private bool isAttachment;
        private readonly string contentType;

        public FileResult(string filePath, string contentType = null, bool isAttachment = true)
        {
            this.filePath = filePath;
            this.contentType = contentType;
            this.isAttachment = isAttachment;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.Run(() =>
            {
                var response = new HttpResponseMessage();
                try
                {

                    response.Content = new StreamContent(new FileStream(filePath, FileMode.Open));

                    var contentType = this.contentType ?? MimeMapping.GetMimeMapping(Path.GetExtension(filePath));
                    response.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);
                    if (this.isAttachment)
                    {
                        response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                        {
                            FileName = Path.GetFileName(filePath)
                        };
                    }

                    response.StatusCode = HttpStatusCode.OK;
                }
                catch (FileNotFoundException)
                {
                    response.StatusCode = HttpStatusCode.NotFound;
                }
                catch (Exception e)
                {
                    response.StatusCode = HttpStatusCode.InternalServerError;
                    response.Content = new StringContent(e.ToString());
                }
                return response;
            }, cancellationToken);
        }


    }
}