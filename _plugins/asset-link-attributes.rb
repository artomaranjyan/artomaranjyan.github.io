require 'nokogiri'
require 'uri'

# Local posters, slides, and other files should keep the website open too.
Jekyll::Hooks.register [:pages, :documents], :post_render do |document|
  next unless document.output_ext == '.html'

  html = Nokogiri::HTML(document.output)
  assets_path = "#{document.site.config['baseurl']}/assets/"
  changed = false

  html.css('a[href]').each do |link|
    begin
      path = URI.parse(link['href']).path
    rescue URI::InvalidURIError
      next
    end
    next unless path&.start_with?(assets_path, 'assets/')

    link['target'] = '_blank'
    link['rel'] = (link['rel'].to_s.split + %w[noopener noreferrer]).uniq.join(' ')
    changed = true
  end

  document.output = html.to_html if changed
end
