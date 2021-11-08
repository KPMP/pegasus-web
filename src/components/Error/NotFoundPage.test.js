import { getBackToHomePath } from './NotFoundPage';

describe('getBackToHomePath', () => {
    it('should return the path / when given a path of nothing', async () => {
        const pathname = '/'
        const expectedPathname = '/'
        const resultedPathname = await getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / when not given a path with explorer', async () => {
        const pathname = '/foo'
        const expectedPathname = '/'
        const resultedPathname = await getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / when given multiple subpath without explorer', async () => {
        const pathname = '/foo/bar'
        const expectedPathname = '/'
        const resultedPathname = await getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /explorer when given a path with just explorer', async () => {
        const pathname = '/explorer'
        const expectedPathname = '/explorer'
        const resultedPathname = await getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /explorer when given a path with explorer in it', async () => {
        const pathname = '/explorer/foo'
        const expectedPathname = '/explorer'
        const resultedPathname = await getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path / path when explorer not the first subpath', async () => {
        const pathname = '/foo/explorer'
        const expectedPathname = '/'
        const resultedPathname = await getBackToHomePath(pathname)
        
        expect(resultedPathname).toBe(expectedPathname)
    });
    it('should return the path /explorer when given a path with explorer in it but slightly-mis-typed', async () => {
        const pathname = '/explorerffff/foo'
        const expectedPathname = '/explorer'
        const resultedPathname = await getBackToHomePath(pathname)

        expect(resultedPathname).toBe(expectedPathname)
    }); 
    it('should return the path / when given a path with explorer in the path but it is seriously mis-typed', async () => {
        const pathname = '/exqwjeiqwjeplqwoeqiwejoqweiqwejrerffffffff/foo'
        const expectedPathname = '/'
        const resultedPathname = await getBackToHomePath(pathname)

        expect(resultedPathname).toBe(expectedPathname)
    }); 
});

