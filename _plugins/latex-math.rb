require 'bibtex'
require 'latex/decode'
require 'cgi'
require 'jekyll/scholar/plugins/smallcaps'
require 'jekyll/scholar/plugins/superscript'

module BibTeX
  module Filters
    # Decode TeX accents and grouping outside equations; let MathJax handle equations.
    class LatexMath < Filter
      MATH = /((?<!\\)\$\$(?:\\.|(?!\$\$).)*\$\$|(?<!\\)\$(?:\\.|[^$\\])+\$|\\\((?:\\(?!\))|[^\\])*\\\)|\\\[(?:\\(?!\])|[^\\])*\\\])/m

      def apply(value)
        value.to_s.split(MATH).each_with_index.map do |part, index|
          if index.even?
            next [:latex, :smallcaps, :superscript].reduce(part) do |text, name|
              BibTeX::Filters.resolve!(name).apply(text)
            end
          end

          math = if part.start_with?('$$')
                   '\\[' + part[2...-2] + '\\]'
                 elsif part.start_with?('$')
                   '\\(' + part[1...-1] + '\\)'
                 else
                   part
                 end
          CGI.escapeHTML(math)
        end.join
      end
    end
  end
end
