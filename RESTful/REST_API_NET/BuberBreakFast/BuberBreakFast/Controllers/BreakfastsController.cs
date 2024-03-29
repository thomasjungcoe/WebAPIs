using BuberBreakfast.Contracts.Breakfast;
using BuberBreakfast.Models;
using BuberBreakfast.Services.Breakfasts;
using Microsoft.AspNetCore.Mvc;

namespace BuberBreakfast.Controllers;

[ApiController]
// [Route("breakfasts")]
[Route("[Controller]")]
public class BreakfastsController : ControllerBase {
    private readonly IBreakfastService _breakfastService;

    public BreakfastsController(IBreakfastService breakfastService) {
        _breakfastService = breakfastService;
    }
    
    // configuring the end points
    // [HttpPost("/breakfasts/)]
    [HttpPost]
    public IActionResult CreateBreakfast(CreateBreakfastRequest request) {
        var breakfast = new Breakfast(
            Guid.NewGuid(),
            request.Name,
            request.Description,
            request.StartDateTime,
            request.EndDateTime,
            DateTime.UtcNow,
            request.Savory,
            request.Sweet);

            _breakfastService.CreateBreakfast(breakfast);

            var response = new BreakfastResponse(
                breakfast.Id,
                breakfast.Name,
                breakfast.Description,
                breakfast.StartDateTime,
                breakfast.EndDateTime,
                breakfast.LastModifiedDateTime,
                breakfast.Savory,
                breakfast.Sweet);
                
        return CreatedAtAction(
            actionName: nameof(GetBreakfast),
            routeValues: new { id = breakfast.Id},
            value: response);
    }

    [HttpGet("/{id:guid}")]
    public IActionResult GetBreakfast(Guid id) {

        Breakfast breakfast = _breakfastService.GetBreakfast(id);

        var response = new BreakfastResponse(
            breakfast.Id,
            breakfast.Name,
            breakfast.Description,
            breakfast.StartDateTime,
            breakfast.EndDateTime,
            breakfast.LastModifiedDateTime,
            breakfast.Savory,
            breakfast.Sweet);
        return Ok(response);
    }

    [HttpPut("/{id:guid}")]
    public IActionResult UpsertBreakfast(Guid id, UpsertBreakfastRequest request) 
    {
        var breakfast = new Breakfast(
            id,
            request.Name,
            request.Description,
            request.StartDateTime,
            request.EndDateTime,
            DateTime.UtcNow,
            request.Savory,
            request.Sweet);

        _breakfastService.UpsertBreakfast(breakfast);
        // we want to return no content only if the id of the break fast already exists, else we want to create a new breakfast
        // TODO: return 201 if a new breakfast was created
        return NoContent();
    }
    
    [HttpDelete("/{id:guid}")]
    public IActionResult DeleteBreakfast(Guid id) {
        _breakfastService.DeleteBreakfast(id);
        return NoContent();
    }
}