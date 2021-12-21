import { getBackToHomePath, getPageTitle } from './NotFoundPage';

describe('getBackToHomePath', () => {
    it('should return the path / when given a path of nothing', () => {
        const pathname = '/'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / when not given a path with explorer', () => {
        const pathname = '/foo'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / when given multiple subpath without explorer', () => {
        const pathname = '/foo/bar'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /explorer when given a path with just explorer', () => {
        const pathname = '/explorer'
        const expectedPathname = '/explorer'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /repository when given a path with just repository', () => {
        const pathname = '/repository'
        const expectedPathname = '/repository'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /explorer when given a path with explorer in it', () => {
        const pathname = '/explorer/foo'
        const expectedPathname = '/explorer'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / path when explorer not the first subpath', () => {
        const pathname = '/foo/explorer'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /explorer when given a path with explorer in it but slightly-mis-typed', () => {
        const pathname = '/explorerffff/foo'
        const expectedPathname = '/explorer'
        const resultedPathname = getBackToHomePath(pathname)

        expect(resultedPathname).toBe(expectedPathname)
    }); 
    it('should return the path / when given a path with explorer in the path but it is seriously mis-typed', () => {
        const pathname = '/exqwjeiqwjeplqwoeqiwejoqweiqwejrerffffffff/foo'
        const expectedPathname = '/'
        const resultedPathname = getBackToHomePath(pathname)

        expect(resultedPathname).toBe(expectedPathname)
    }); 
});

describe('gePageTitle', () => {
    it('should return the page title of Kidney Tissue Atlas when path is /', () => {
        const pathname = '/'
        const expectedTitle = 'Kidney Tissue Atlas'
        const result = getPageTitle(pathname)
        
        expect(result).toBe(expectedTitle)
    });
    it('should return the page title of Kidney Tissue Atlas when path is /foo', () => {
        const pathname = '/foo'
        const expectedTitle = 'Kidney Tissue Atlas'
        const result = getPageTitle(pathname)
        
        expect(result).toBe(expectedTitle)
    });
    it('should return the page title of Kidney Tissue Atlas when path is /explorer', () => {
        const pathname = '/explorer'
        const expectedTitle = 'Explorer'
        const result = getPageTitle(pathname)
        
        expect(result).toBe(expectedTitle)
    });
    it('should return the page title of Repository when path is /repository', () => {
        const pathname = '/repository'
        const expectedTitle = 'Repository'
        const result = getPageTitle(pathname)
        
        expect(result).toBe(expectedTitle)
    });
});
